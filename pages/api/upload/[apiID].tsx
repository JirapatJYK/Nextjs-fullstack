import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import formidable from 'formidable-serverless';
import { connectToDatabase } from "../../../lib/mongodb";
import path from "path";
// type Data = {
//     data: string;
//     url: string
// }

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { database }: {database: any} = await connectToDatabase()?? {database: null}; //กำหนด ค่าเริ่มต้น
    const collection = await database.collection(process.env.COLLECTION_UPLOADS);
    const { apiID } = await req.query;

    apiID === "upload-file"
      ? post(req, res, collection)
      
    :apiID === "PUT"
      ? console.log("PUT")

    :apiID === "delete-upload-file"
      ? deleteFile(collection, res)

    :apiID === "delete-upload-files-all"
      ? deleteAll(collection, res)

    :apiID === "get-upload-file"
      ? ''//getFile(collection, res)

    :apiID === "get-upload-files-all"
      ? getFilesAll(collection, res)
      
    : res.status(404).send("");
};

const post = async (req: any, res: any, collection: any) => {
    const form = new formidable.IncomingForm();
    // form.uploadDir = "../../../uploads"
    form.parse(req, function (err:any, fields: any, files:any) {
        console.log(fields.creater);
        saveFile(files.file, fields).then(function (filePath) {
            fields.path = filePath;
            updateDb(fields, collection);
        });
        
    //   return res.status(201).send(files.file);
    });
    
    return res.status(201).send(req.body);
};
const saveFile = async (file: any, params: any) => {
    // console.log(file);
    const timstamp = Date.now()
    let path = `./public/uploads/${params.creater}-${timstamp}-${file.name}`
    const data = await fs.readFileSync(file.path);
    await console.log(data);
    await fs.writeFileSync( path, data);
    await fs.unlinkSync(file.path);
    path = await `/uploads/${params.creater}-${timstamp}-${file.name}`
    return path;
};
const updateDb =(params: any, collection: any) => {
    console.log(params.path);
    console.log(params.creater);
    const data = {
        name : params.name,
        creater: params.creater,
        path: params.path,
        owner: params.creater,
        description: params.description,
        external_link: params.external_link,
    }
    collection.insertOne(data);
}

const deleteFile = (collection: any, res: NextApiResponse) => {
    fs.readdir('uploads', (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join('uploads', file), err => {
                if (err) throw err;
            })
        }
    })
    collection.deleteMany({})
}
const deleteAll = (collection: any, res: NextApiResponse) => {
    fs.readdir('./public/uploads', (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join('./public/uploads', file), err => {
                if (err) throw err;
            })
        }
    })
    collection.deleteMany({})
}
const getFilesAll = async (collection: any, res: NextApiResponse) => {
    let results: any = []
    results = await collection.find({}).toArray()?? {results: []};
    // await console.log(results);
    await res.status(200).json(results);
}
export const config = {
    api: {
        bodyParser: false
    }
}
