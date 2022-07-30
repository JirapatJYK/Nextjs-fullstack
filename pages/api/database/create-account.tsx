import { MongoServerError, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const { database } = await connectToDatabase();
    var collection = database.collection(process.env.COLLECTION_ACCOUNTS);
    const newDocument = await {
        _id: ObjectId,
        name: "tew3",
        email: "jirapat@gmail.com",
        password: "password0",
    }
    try {
        await collection.insertOne(newDocument);
        var results = newDocument;
        // await collection.insertOne({ _id: 1 }); // duplicate key error
      } catch (error) {
        if (error instanceof MongoServerError) {
          console.log(`Error worth logging: ${error}`); // special case for some reason
        }
        throw error; // still want to crash
      }
    res.status(200).json(results);

}