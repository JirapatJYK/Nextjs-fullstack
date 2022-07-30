import { MongoServerError } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const { database } = await connectToDatabase();
    var collection = database.collection(process.env.COLLECTION_ACCOUNTS);

    const results = await collection.find({}).toArray();
    res.status(200).json(results);

}