import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import formidable from "formidable";

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
  const post = async (req: NextApiRequest, res: NextApiResponse) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err:any, fields:any, files:any) {
        console.log(files);
        // await saveFile(files.file);
      return res.status(201).send("");
    });
  };
const saveFile = async (file: any) => {
    const data = fs.readFileSync(file);
    fs.writeFileSync(`./public/${file.name}`, data);
    await fs.unlinkSync(file.path);
    return;
};
export const config = {
    api: {
        bodyParser: {
            sizeLimit: "6mb"
        }
    }
}
