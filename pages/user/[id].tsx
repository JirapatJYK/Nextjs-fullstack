import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";

export default function UserID(){
    const router = useRouter()
    const {id} =router.query
    const [accountId, setAccountId] = useState(id)
    useEffect(()=>{
        console.log(accountId)
        if(id!=undefined){
            fetchUserInfo(accountId) 
        }
        
    }, [])

    function fetchUserInfo(id: any){
        console.log(`fetchUserInfo id: ${id}`)
    }
    return (
        <div>
            <h1>ACCOUNT ID {id}</h1>
        </div>
    )
}