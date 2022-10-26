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

export async function collection() {
    const { database }: {database: any} = await connectToDatabase()?? {database: null};
    var account_collection = await database.collection(process.env.COLLECTION_ACCOUNTS);
    var authentication_collection = await database.collection(process.env.COLLECTION_AUTHENTICATION);
    var items_collection = await database.collection(process.env.COLLECTION_ITEMS);
    var uploads_collection = await database.collection(process.env.COLLECTION_UPLOADS);

    return { account_collection, authentication_collection, items_collection, uploads_collection}
}