import { createCipheriv, privateEncrypt, randomBytes, scrypt, scryptSync } from "crypto";
import { request } from "https";
import { MongoServerError, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Cookies } from "next/dist/server/web/spec-extension/cookies";
import { type } from "os";
import { promisify } from "util";
import { connectToDatabase } from "../../../lib/mongodb";
import { Account } from "../model/account";
const bcrypt = require("bcrypt");
const cookies = new Cookies()
var jwt = require('jsonwebtoken');
// Encode
// const token = jwt.sign(
//   { user_id: user._id, email },
//   process.env.TOKEN_KEY,
//   {
//     expiresIn: "2h",
//   }
// );

// Decode 
// try {
//   const decoded = jwt.verify(token, config.TOKEN_KEY);
//   req.user = decoded;
// } catch (err) {
//   return res.status(401).send("Invalid Token");
// }

type friendList = {
  u_id: ObjectId,
  friendList: Array<ObjectId>
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { account_api } = await req.query;
  let results: any = [];
  console.log(req.body);
  const params = req.body
  try {
    const { database }: { database: any } = await connectToDatabase() ?? { database: null }; //กำหนด ค่าเริ่มต้น
    var collection = await database.collection('cesalert');

    account_api == 'get-alert-all'
      ? results = await getAlertsAll(collection)
            : account_api == 'bookmark-alert-one'
              ? results = await bookmarkAlertOne(collection, params)
              : account_api == 'favorite-alert-one'
              ? results = await favoriteAlertOne(collection, params)
              : account_api == 'read-alert-one'
              ? results = await readAlertOne(collection, params)
                    //default
                    : res.status(404).send("");
  } catch (error) {
    console.log(error);
  }
  res.status(200).json(results);
}
// GET
async function getAlertsAll(collection: any) {
  return await collection.find({}).toArray() ?? { results: [] };
}

// POST

// PUT
async function bookmarkAlertOne(collection: any, params: any) {
  console.log(params);
  const topicId: string = await params.intTopicID;
  const bookmark: string = await params.blnBookmarked;
  let updateResult: any;
  console.log(bookmark=='true');
  try{
    updateResult = await collection.updateOne({ intTopicID: topicId }, { $set: { 'blnBookmarked': (bookmark=='true') } });
  }catch (err){
    console.log(err);
  }
  console.log(updateResult);
  return updateResult;
}
async function favoriteAlertOne(collection: any, params: any) {
  console.log(params);
  const topicId: string = await params.intTopicID;
  const favorite: string = await params.blnFavorited;
  let updateResult: any;
  console.log(favorite=='true');
  try{
    updateResult = await collection.updateOne({ intTopicID: topicId }, { $set: { 'blnFavorited': (favorite=='true') } });
  }catch (err){
    console.log(err);
  }
  console.log(updateResult);
  return updateResult;
}
async function readAlertOne(collection: any, params: any) {
  console.log(params);
  const topicId: string = await params.topicId;
  const read: string = await params.read;
  let updateResult: any;
  console.log(read=='true');
  try{
    updateResult = await collection.updateOne({ intTopicID: topicId }, { $set: { 'blnRead': true } });
  }catch (err){
    console.log(err);
  }
  console.log(updateResult);
  return updateResult;
}
