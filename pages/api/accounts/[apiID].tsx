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
      ? results = getAccountsAll(collection)
      : apiID == 'delete-accounts-all'
      ? results = deleteAccountsAll(collection)
      : apiID == 'get-account'
      ? results = getAccountsAll(collection)
      : apiID == 'create-account'
      ? results = createAccount(collection, req)
      : apiID == 'edit-account'
      ? results = getAccountsAll(collection)
      : res.status(404).send("");
  //   if (apiID === 'get-accounts-all'){
  //     results = await collection.find({}).toArray()?? {results: []};
  //   }else if (apiID === 'create-account'){
  //     let accountData = await  req.body.params;
  //     Object.assign(accountData, {_id: ObjectId});
  //     try {
  //       await collection.insertOne(accountData);
  //       results = accountData;
  //       // await collection.insertOne({ _id: 1 }); // duplicate key error
  //     } catch (error) {
  //       if (error instanceof MongoServerError) {
  //         console.log(`Error worth logging: ${error}`); // special case for some reason
  //       }
  //       throw error; // still want to crash
  //     }
  //   }else if(apiID === "delete-accounts-all"){
  //       results = await collection.deleteMany({})
  //   }
  } catch (error) {
    console.log("api error");
  }
  res.status(200).json(results);
}
async function getAccountsAll(collection: any){
  return await collection.find({}).toArray()?? {results: []};
}
async function createAccount(collection: any, req:any){
  let accountData = await  req.body.params;
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

async function deleteAccountsAll(collection: any){
  return await await collection.deleteMany({})
}