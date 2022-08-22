import { useState } from "react";

export default function Dev(){
    const[response, setResponse] = useState([])
    function api(name: string){
        switch(name){
            case "mint":
                const params = {
                    name: "name",
                    description: "description",
                    external_url: "external",
                    type: "type",
                    media: "url",
                    background: "background",
                }
                console.log(params);
        
                fetch('api/smartcontract/mint', {
                    method: 'POST',
                    body: JSON.stringify({params}),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(async (res) => {
                    const data = await res.json();
                    await setResponse(data);
                    await console.table(data);
                })
                
                
            break;
            case "burn":
                fetch('api/smartcontract/burn', {
                    method: 'GET',
                    // body: JSON.stringify({params}),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(async (res) => {
                    // const data = await res.json();
                    // await setResponse(data);
                    await console.log(res);
                })
            break;
            case "transfer":
                fetch('api/smartcontract/transfer', {
                    method: 'GET',
                    // body: JSON.stringify({params}),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(async (res) => {
                    // const data = await res.json();
                    // await setResponse(data);
                    await console.log(res);
                })
            break;
        }
    }
    return(
        <>
            <h1>API</h1>
            <button onClick={()=> api("mint")}>mint</button>
            <button onClick={()=> api("burn")}>burn</button>
            <button onClick={()=> api("transfer")}>transfer</button>
            <br/>
            {/* <p>{response}</p> */}
        </>
    )
}