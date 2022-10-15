import { MongoServerError, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Cookies } from "next/dist/server/web/spec-extension/cookies";
import { connectToDatabase } from "../../../lib/mongodb";
var jwt = require('jsonwebtoken');
const accountModel = {
  _id: " ",
  status: true, // active, banned
  profile: {
      name: " ",
      email: " ",
      wallet: {
          address: " ",
          credits: 0,
          gems: 0,
      },
      avatar: " ",
      frame: " ",
      banner: " ",
  },
  basicItems: [
    {
      id: " ",
      amount: " "
    }
  ],
  nftItems: [
    {
      id: " ",
    }
  ],
  friend: [
    {
      id: " ",
    }
  ]
}
const result = {
  status: '',
  token: '',
  userInfo: {
    _id: " ",
    status: 0,
    name: " ",
    email: " ",
    wallet: {
        address: " ",
        credits: 0,
        gems: 0,
    },
    avatar: " ",
    frame: " ",
    banner: " ",
  }
}
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { apiID } = await req.query;
  let results:any = [];
  console.log(req.body.params)
  try {
    const { database }: {database: any} = await connectToDatabase()?? {database: null}; //กำหนด ค่าเริ่มต้น
    var collection = await database.collection(process.env.COLLECTION_ACCOUNTS);
    apiID == 'get-accounts-all'
      ? results = await getAccountsAll(collection)
      : apiID == 'delete-accounts-all'
      ? results = await deleteAccountsAll(collection)
      : apiID == 'get-account-one'
      ? results = await getAccountOne(collection, req)
      : apiID == 'create-account-one'
      ? results = await createAccountOne(collection, req)
      : apiID == 'edit-account-one'
      ? results = await editAccountOne(collection, req)
      : apiID == 'signin'
      ? results = await Signin(collection, req)
      : res.status(404).send("");
  } catch (error) {
    console.log("api error");
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
async function createAccountOne(collection: any, req:any){
  let accountData = await  req.body.params;
  const username = req.body.params.name.toUpperCase()
  console.log(username);
  console.log(req.body.params)
  // collection.aggregate([
  //   { $group : { _id:"$name": username}},
  //   { "$match": { name: username}}
  // ])
  Object.assign(accountData, {_id: ObjectId});
  try {
    await collection.insertOne(accountData);
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
  console.log(req.header)
  let account:any;
  const username = req.body.params
  try {
    account = await collection.findOne({ "name": username})?? {accountData: []};
  } catch (error) {
    if (error instanceof MongoServerError) {
      console.log(`Error worth logging: ${error}`); // special case for some reason
    }
    throw error; // still want to crash
  }
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
  console.log(account)
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

async function Signin(collection: any, req:any){
  const cookies = new Cookies(req)

  const email = await req.body.params.email
  const password = await req.body.params.password
  const account:any = await collection.findOne({ email: email })?? {account: null};
  
  if(account == null)
  result.status = 'account not found';
  
  if(password == account.password){
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
    result.token=jwt.sign({account}, 'shhhhh');
    cookies.set('jwt', result.token, {expires: new Date(0)});
    console.log(cookies.get('jwt'));
  }else result.status = 'wrong password';
  console.log(result)
  return result
}