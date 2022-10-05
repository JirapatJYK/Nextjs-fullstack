import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import formidable from 'formidable';
import { create } from "domain";
// type Data = {
//     data: string;
//     url: string
// }
export default (req: NextApiRequest, res: NextApiResponse) => {
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
        console.log(fields.creater);
        saveFile(files.file, fields.creater);
    //   return res.status(201).send(files.file);
    });
    // console.log(req.body);
    return res.status(201).send(req.body);

  };
export const saveFile = async (file: any, creater: string) => {
    // console.log(file);
    const data = await fs.readFileSync(file.path);
    await console.log(data);
    await fs.writeFileSync(`./uploads/${creater}-${Date.now()}-${file.name}`, data);
    await fs.unlinkSync(file.path);
    return;
};

export const config = {
    api: {
        bodyParser: false
    }
}
