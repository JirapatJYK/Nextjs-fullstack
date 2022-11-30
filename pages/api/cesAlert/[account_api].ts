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
  const params = req.body.params
  try {
    const { database }: { database: any } = await connectToDatabase() ?? { database: null }; //กำหนด ค่าเริ่มต้น
    var collection = await database.collection('cesalert');

    account_api == 'get-alert-all'
      ? results = await getAlertsAll(collection)
            : account_api == 'edit-alert-one'
              ? results = await editAlertOne(collection, params)
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
async function editAlertOne(collection: any, req: any) {
  let topicId = await req.body.params;
  // Object.assign(accountID, {_id: ObjectId});
  // try {
  //   await collection.insertOne(accountData);
  //   return accountData;
  //   // await collection.insertOne({ _id: 1 }); // duplicate key error
  // } catch (error) {
  //   if (error instanceof MongoServerError) {
  //     console.log(`Error worth logging: ${error}`); // special case for some reason
  //   }
  //   throw error; // still want to crash
  // }
}
