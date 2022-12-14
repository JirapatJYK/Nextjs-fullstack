import { NextApiRequest, NextApiResponse } from "next";
import { Network, Alchemy } from "alchemy-sdk";

const settings = {
    apiKey: process.env.API_URL, // Replace with your Alchemy API Key.
    network: Network.MATIC_MUMBAI, // Replace with your network.
};
const alchemy = new Alchemy(settings);


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const {apiID} = await req.query;
    let results: any
    switch(apiID)
    {
        case "mint":
            results = await mint(req.body.params);
        break;
        case "burn":
            results = await burn();
        break;
        case "transfer":
            results = await transfer();
        break;
    }
    await res.status(200).json(results);
}



async function mint(params:any,){
    try{
        let metadata = params;
        return metadata;
    } catch(err){
        console.log(err);
    }
}


async function burn(){
    try{
        let metadata = await "burn function";
        return metadata;
    } catch(err){
        console.log(err);
    }
}

async function transfer(){
    try{
        let metadata = await "transfer function";
        return metadata;
    } catch(err){
        console.log(err);
    }

}