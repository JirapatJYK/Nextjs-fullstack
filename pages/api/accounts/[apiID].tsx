import { MongoServerError, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { apiID } = await req.query;
  let results:any = [];
  
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
  let accountData = {};
  const username = req.body.params
  try {
    accountData = await collection.findOne({ "name": username})?? {accountData: []};
  } catch (error) {
    if (error instanceof MongoServerError) {
      console.log(`Error worth logging: ${error}`); // special case for some reason
    }
    throw error; // still want to crash
  }
  console.log(accountData)
  return accountData;
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
  const userName = await req.body.params.userName
  const password = await req.body.params.password
  const account:any = await collection.findOne({ name: userName })?? {account: null};
  const result = {
    status: '',
    id:''
  }
  if(account == null)
  result.status = 'account not found';

  if(password == account.password){
    console.log(account);
    result.status = 'success';
    result.id=account._id;
  }else result.status = 'wrong password';

  return result
}