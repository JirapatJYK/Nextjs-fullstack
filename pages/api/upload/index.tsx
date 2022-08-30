import { NextApiRequest, NextApiResponse } from "next";


type Data = {
    data: string;
    url: string
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    let fileUpload = req.body.params;
    console.log(fileUpload);
    res.status(200).json(JSON.stringify({fileUpload}));
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "6mb"
        }
    }
}