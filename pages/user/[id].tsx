import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";

export default function UserID(){
    const router = useRouter()
    const {id} =router.query
    const [accountId, setAccountId] = useState(id)
    const [accountData, setAccountData] = useState({})
    useEffect(()=>{
        console.log(accountId)
        // if(id!=undefined)
        {
            fetchUserInfo(accountId) 
        }
    }, [])
    // async function getUserData(){}
    async function fetchUserInfo(id: any){
        const params = 'Jirapat Jaiyakwang'
        const response = await fetch('/api/accounts/get-account-one', {
            method: 'POST',
            body: JSON.stringify({params}),
            headers: {
                'Content-Type': 'application/json'
            }, 
        })
        const data = await response.json()
        console.log(data)
        setAccountData(data)
    }
    return (
        <div>
            <h1>ACCOUNT ID {id}</h1>
            <p>{JSON.stringify(accountData)}</p>
        </div>
    )
}