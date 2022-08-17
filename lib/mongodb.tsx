import { Db, MongoClient } from "mongodb";

const uri: any = process.env.MONGODB_URI;
const options: any = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let mongoClient: any;
let database: any;

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}

export async function connectToDatabase() {
    try {
        if (mongoClient) {
            return { mongoClient, database };
        }
        if (process.env.NODE_ENV === "development") {
            let globalWithMongoClientPromise = global as typeof globalThis & {
                _mongoClientPromise: MongoClient;
            };

            if (!globalWithMongoClientPromise._mongoClientPromise) {
                mongoClient = await (new MongoClient(uri, options));
                globalWithMongoClientPromise._mongoClientPromise = mongoClient;
            } else {
                mongoClient = globalWithMongoClientPromise._mongoClientPromise;
            }
        } else {
            mongoClient = await (new MongoClient(uri, options)).connect();
        }
        database = await mongoClient.db(process.env.DATABASE);
        return { mongoClient, database };
    } catch (e) {
        console.error(e);
    }
}