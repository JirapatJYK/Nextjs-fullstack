import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import Navbar from "../../components/Navbar";

export default function UserID(){
    const router = useRouter()
    const {id} =router.query
    const [accountId, setAccountId] = useState(id)
    const[listUserInfo, setListUserInfo] = useState({
        _id: " ",
        status: 0,
        name: "",
        email: " ",
        wallet: {
            address: " ",
            credits: 0,
            gems: 0,
        },
        avatar: "",
        frame: " ",
        banner: " ",
    });
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
        const token = getCookie("myToken")?.toString()
        const response = await fetch('/api/accounts/get-account-one', {
            method: 'POST',
            body: JSON.stringify({params}),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token !== undefined? token: ''
            }, 
        })
        const data = await response.json()
        console.log(data)
        setListUserInfo(data)
    }
    return (
        <>
            <Navbar />
            <div className="container" style={{height: '100vh'}}>
                
                <div className="main">
                    <aside style={{background: "white", padding: '10px' }}>
                        <div style={{backgroundImage: 'url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/9a08f27c-30ec-4158-8613-4da1bf857d91/dayafxh-e78593cc-fc0b-408b-88ab-3cdad774cbb8.png)'}}>
                            <Image src={listUserInfo.avatar != ""? listUserInfo.avatar: '/favicon.ico'} width="200px" height="200px" onClick={()=>{console.log("change avatar")}}/>
                        </div>
                        
                    </aside>
                    <div className="">
                        <h1>ACCOUNT ID {id}</h1>
                        <pre>{listUserInfo.name}</pre>
                    </div>
                </div>
                
            </div>
        </>
        
    )
}