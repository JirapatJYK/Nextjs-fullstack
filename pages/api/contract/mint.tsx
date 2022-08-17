import { NextApiRequest, NextApiResponse } from "next";


type Data = {
    name: string
}
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    let metadata = req.body.params;
    
    res.status(200).json(metadata);
}