import { request } from "http";
import { MongoServerError, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { apiID } = await req.query;
  let results:any = [];
  const { database }: {database: any} = await connectToDatabase()?? {database: null}; //กำหนด ค่าเริ่มต้น
    var collection = await database.collection(process.env.COLLECTION_ACCOUNTS);
  try {
    switch (apiID){
      case 'create-account':
        let accountData = await  req.body.params;
        Object.assign(accountData, {_id: ObjectId});
        try {
          await collection.insertOne(accountData);
          results = accountData;
          // await collection.insertOne({ _id: 1 }); // duplicate key error
        } catch (error) {
          if (error instanceof MongoServerError) {
            console.log(`Error worth logging: ${error}`); // special case for some reason
          }
          throw error; // still want to crash
        }
      break;
      case 'get-accounts-all':
        results = await collection.find({}).toArray()?? {results: []};
      break;
      case 'get-account':
        results = await collection.find({name: req.body}).toArray()?? {results: []};
      break;
      case 'delete-accounts-all':
        results = await collection.find({}).toArray()?? {results: []};
      break;
      case 'delete-account':
        results = await collection.deleteMany({})
      break;
    }
  } catch (error) {
    console.log("api error");
  }
  await console.log(req.body);
  await console.log("Jirapat Jaiyakwang");

  await console.log(results);
  await res.status(200).json(results);
}