import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import Background from "../../../components/Background";
import Navbar from "../../../components/Navbar";
import TextInput from "../../../components/TextInput";

export default function UserID() {
    const router = useRouter()
    const { id } = router.query
    const [accountId, setAccountId] = useState(id)
    const [listUserInfo, setListUserInfo] = useState({
        _id: " ",
        status: "",
        username: "",
        email: " ",
        exp: 0,
        avatar: "/favicon.ico",
        frame: " ",
        banner: " ",
    });
    const [walletInfo, setWalletInfo] = useState({
        wallet_address: "",
        credits: 0,
        gems: 0
    });
    const [loading, setLoading] = useState(true);
    const [strUsername, setStrUsername] = useState('');
    const [usernameProps, setUsernameProps] = useState({
        required: true,
        labelName: "Your name",
        value: listUserInfo.username,
        type: "text",
        onInput: setStrUsername,
        validate: "",
        trigger: false,
    });
    const [strEmail, setStrEmail] = useState('');
    const [emailProps, setEmailProps] = useState({
        required: true,
        labelName: "Your email",
        value: listUserInfo.email,
        type: "text",
        onInput: setStrEmail,
        validate: "",
        trigger: false,
    })
    useEffect(() => {
        console.log(accountId)
        // if(id!=undefined)
        {
            fetchUserInfo(accountId)
        }
    }, [])
    // async function getUserData(){}
    async function fetchUserInfo(id: any) {
        const myToken = getCookie("myToken")?.toString()
        // const response = await fetch('/api/accounts/get-account-one', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'authorization': myToken !== undefined ? myToken : ''
        //     },
        // })
        // if (response) {
        //     const data = await response.json()
        //     console.log(data.status);

        //     await setListUserInfo(data.data.baseInfo);
        //     await setWalletInfo(data.data.wallet);
        //     await setLoading(data.status != 'success');
        // }else console.log('fetch error');


    }
    return (
        <>
            <Navbar />
            {
                loading == false ? <div className="container" style={{ height: '100vh' }} >

                    <div className="main" style={{ color: '#eeeeee', display: 'flex', gap: '50px', justifyContent: 'center', marginTop: '20px' }}>
                        <aside className='parallelogram'>
                            <div style={{ transform: 'skew(5deg)', backgroundImage: 'url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/9a08f27c-30ec-4158-8613-4da1bf857d91/dayafxh-e78593cc-fc0b-408b-88ab-3cdad774cbb8.png)' }}>


                                <Image src={listUserInfo.avatar} width="200px" height="200px" onClick={() => { console.log("change avatar") }} />
                            </div>
                            <div style={{ maxWidth: "400px", padding: '10px', overflow: 'hidden' }}>
                                <h1>{listUserInfo.username}</h1>
                                <fieldset >
                                    <legend><h2>Wallet</h2></legend>
                                    <ul style={{ margin: '0 auto', width: '380px', overflow: 'hidden', padding: '10px' }}>
                                        <li><a>{walletInfo.wallet_address}</a></li>
                                        <li>Credits: {walletInfo.credits}</li>
                                        <li>Gems: {walletInfo.gems}</li>
                                    </ul>

                                </fieldset>
                            </div>

                        </aside>
                        <div className='parallelogram' >
                            <h1>ACCOUNT ID {id}</h1>
                            <pre>{listUserInfo.username}</pre>
                            {/* <form style={{ maxWidth: '1024px' }}> */}
                            <fieldset>
                                <legend>Personal Information</legend>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                    <TextInput {...usernameProps} />
                                    <TextInput {...emailProps} />
                                </div>

                            </fieldset>
                            <fieldset>
                                <legend>Wallet Information</legend>
                                <a>Wallet {"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}</a>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                    <TextInput {...usernameProps} />
                                    <TextInput {...emailProps} />
                                </div>

                            </fieldset>
                            {/* </form> */}
                        </div>


                    </div>

                </div> : ""}
            <Background />
        </>

    )
}