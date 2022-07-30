import { MongoServerError } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const { database } = await connectToDatabase();
    var collection = database.collection(process.env.COLLECTION);
    const newDocument = await {
        _id: '1',
        name: "tew3",
        email: "jirapat@gmail.com",
        password: "password0",
    }
    try {
        await collection.insertOne({newDocument});
        // await collection.insertOne({ _id: 1 }); // duplicate key error
      } catch (error) {
        if (error instanceof MongoServerError) {
          console.log(`Error worth logging: ${error}`); // special case for some reason
        }
        throw error; // still want to crash
      }
    collection = await collection.insertOne({newDocument});
    const results = await database.collection(process.env.COLLECTION).find({}).toArray();
    res.status(200).json(results);

}