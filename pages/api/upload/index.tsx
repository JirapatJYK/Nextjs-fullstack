import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import formidable from 'formidable';
import { create } from "domain";
import { connectToDatabase } from "../../../lib/mongodb";
var collection: any;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { database }: { database: any } = await connectToDatabase() ?? { database: null }; //กำหนด ค่าเริ่มต้น
        collection = await database.collection('uploads');
    } 
    catch (err){

    }
    req.method === "POST"
      ? post(req, res)
      : req.method === "PUT"
      ? console.log("PUT")
      : req.method === "DELETE"
      ? console.log("DELETE")
      : req.method === "GET"
      ? console.log("GET")
      : res.status(404).send("");
  };
  const post = async (req: any, res: any) => {
    const form = new formidable.IncomingForm();
    // form.uploadDir = "../../../uploads"
    form.parse(req, function (err:any, fields:any, files:any) {
        console.log(files);
        console.log(fields);
        saveFile(files.file, fields.creater, fields.filename);
    //   return res.status(201).send(files.file);
    });
    // console.log(req.body);
    return res.status(201).send(req.body);

  };
export const saveFile = async (file: any, creater: string, filename: string) => {
    // console.log(file);
    const data = await fs.readFileSync(file);
    await console.log(data);
    await fs.writeFileSync(`./uploads/${creater}-${filename}-${Date.now()}`, data);
    await fs.unlinkSync(file.path);
    saveToDatabase();
    return;
};
const saveToDatabase = async () =>{
    const uploadCollection = await collection.find({}).toArray() ?? { results: [] };
    console.log(uploadCollection);
}
export const config = {
    api: {
        bodyParser: false
    }
}
