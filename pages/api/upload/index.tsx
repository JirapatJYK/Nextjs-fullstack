import { NextApiRequest, NextApiResponse } from "next";


type Data = {
    url: string
}
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    let fileUpload = req.body.params;
    console.log(fileUpload);
    res.status(200).json({url: "fileUpload.name"});
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "6mb"
        }
    }
}