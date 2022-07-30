import { MongoServerError, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const { apiID } = req.query;
    const { database } = await connectToDatabase();
    var collection = database.collection(process.env.COLLECTION_ACCOUNTS);
    let results
    if (apiID === 'get-accounts-all'){
        results = await collection.find({}).toArray();

    } else if (apiID === 'create-account'){
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
    }else if(apiID === "delete-accounts-all"){
        results = await collection.deleteMany({})
    }

    res.status(200).json(results);
}