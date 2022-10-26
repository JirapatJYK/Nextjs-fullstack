import { createCipheriv, privateEncrypt, randomBytes, scrypt, scryptSync } from "crypto";
import { request } from "https";
import { MongoServerError, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Cookies } from "next/dist/server/web/spec-extension/cookies";
import { promisify } from "util";
import { connectToDatabase } from "../../../lib/mongodb";
import { Account } from "../model/account";
const bcrypt = require("bcrypt");
const cookies = new Cookies()
var jwt = require('jsonwebtoken');

type friendList = {
  u_id: ObjectId,
  friendList: Array<ObjectId>
}
type account = {
  u_id: ObjectId,
  username: String,
  email: String,
  avatar: String,
  frame: String,
  banner: String,
  exp: Number,
  status: Number,
}
type signup = {
  username: String,
  email: String,
  password: String
}
type authentication ={
  u_id: ObjectId,
  recent_login: Date,
  password: any,
  otp: String,
  token: String
}
type items = {
  u_id: ObjectId,
  items: Array<item>
}
type item = {
  i_id: ObjectId,
  name: String,
}
let blnDuplicate = false;
const result = {
  status: '',
  token: '',
  userInfo: {}
}
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { account_api } = await req.query;
  let results:any = [];
  const params = req.body.params
  try {
    const { database }: {database: any} = await connectToDatabase()?? {database: null}; //กำหนด ค่าเริ่มต้น
    var collection = await database.collection(process.env.COLLECTION_ACCOUNTS);
    var authentication_collection = await database.collection(process.env.COLLECTION_AUTHENTICATION);
    account_api == 'get-accounts-all'
      ? results = await getAccountsAll(collection)
      : account_api == 'delete-accounts-all'
      ? results = await deleteAccountsAll(collection)
      : account_api == 'get-account-one'
      ? results = await getAccountOne(collection, params)
      : account_api == 'create-account-one'
      ? results = await createAccountOne(collection, authentication_collection, params)
      : account_api == 'edit-account-one'
      ? results = await editAccountOne(collection, params)
      : account_api == 'signin'
      ? results = await Signin(collection, authentication_collection, params)

      : account_api == 'check-duplicate-username'
      ? results = await checkDuplicateUsername(collection, params)
      : account_api == 'check-duplicate-email'
      ? results = await checkDuplicateEmail(collection, params)
      //default
      : res.status(404).send("");
  } catch (error) {
    console.log(error);
  }
  res.status(200).json(results);
}
// GET
async function getAccountsAll(collection: any){
  return await collection.find({}).toArray()?? {results: []};
}

async function deleteAccountsAll(collection: any){
  return await await collection.deleteMany({})
}
// POST
async function createAccountOne(collection: any, authentication_collection:any, req: signup){
  console.log('req', req.password)
  const u_id = await new ObjectId()
  const accountData:Account =await {
    _id: u_id,
    username: req.username,
    email: req.email,
    exp: 0,
    avatar: "/icons/user.png",
    frame: " ",
    banner: " ",
    status: 'active'
  }
  const password: any = req.password;
  const saltOrRounds = 10;
  const cipher = await bcrypt.hash(password, saltOrRounds);
  const token = jwt.sign({u_id}, 'shhhhh');
  console.log(await bcrypt.compare(password+"ddd", cipher))
  try {
    await collection.insertOne(accountData);
    const auth: authentication = await {
      u_id: u_id,
      recent_login: new Date(),
      password: cipher,
      otp: "1234",
      token: token
    }
    // await authentication_collection.createIndex( { "otp": 1 }, { expireAfterSeconds: 10 } )
    await authentication_collection.insertOne(auth);
    return accountData;
    // await collection.insertOne({ _id: 1 }); // duplicate key error
  } catch (error) {
    if (error instanceof MongoServerError) {
      console.log(`Error worth logging: ${error}`); // special case for some reason
    }
    throw error; // still want to crash
  }
}
async function getAccountOne(collection: any, req:any){
  const userToken = req.headers.authorization
  const _id = jwt.verify(userToken, 'shhhhh')
  let account:any;
  const userId = _id._id
  console.log("token", _id)
  console.log("cookies", cookies.get('jwt'));

  console.log("_id", userId)
  try {
    const account:any = await collection.findOne({ "_id": new ObjectId(userId)})?? {account: null};
    console.log(account)
    if(account == null){
      result.status = 'account not found';
    }else{
      console.log(account);
      result.status = 'success';
      result.userInfo={
        _id: account._id,
        status: 0,
        name: account.name,
        email: account.email,
        wallet: {
            address: "0x808DEe546d3b0cA5296C2cF36B8B50d51e9e9563",
            credits: 0,
            gems: 0,
        },
        avatar: " ",
        frame: " ",
        banner: " ",
      };
    }
  } catch (error) {
    console.log(error);
  }
  return result;
}
// PUT
async function editAccountOne(collection: any, req:any){
  let accountID = await  req.body.params;
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

async function Signin(collection: any, authentication_collection:any, req:any){
  const email = await req.username
  const password = await req.password
  const account:any = await collection.findOne({ email: email })?? {account: null};
  console.log(account)
  const accountAuthen:any = await authentication_collection.findOne({ u_id: account._id })?? {account: null};

  if(account == null)
  result.status = 'account not found';
  console.log(accountAuthen)
  if(await bcrypt.compare(password, accountAuthen.password)){
    console.log(account);
    result.status = 'success';
    result.userInfo=account;
    const _id = account._id
    result.token=jwt.sign({_id}, 'shhhhh');
    cookies.set('jwt', result.token, {maxAge: 300});
    console.log(cookies.get('jwt'));
  }else result.status = 'wrong password';
  console.log(result)
  return result
}

async function checkDuplicateUsername(collection: any, req:any){
  const username = await collection.findOne({ name: req.body.params.username })?? {username: null};
  result.status = (username != null).toString();
}
async function checkDuplicateEmail(collection: any, req:any){
  console.log(req.body.strEmail)
  const email = await collection.findOne({ email: req.body.strEmail })?? null;
  console.log(email)
  blnDuplicate = email != null;
  return blnDuplicate
}