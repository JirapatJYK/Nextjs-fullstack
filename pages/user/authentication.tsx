// import { ObjectId } from "mongodb";
import { getCookie, setCookie } from "cookies-next";
import { NextPage } from "next";
import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader";
import Popup from "../../components/Popup";
import TextInput from "../../components/TextInput";
import Image from "next/image";

const Authentication: NextPage = () => {
    const [strUsername, setStrUsername] = useState("");
    const [strEmail, setStrEmail] = useState('');
    const [strPassword, setStrPassword] = useState('');
    const [strConfirmPassword, setStrConfirmPassword] = useState('');
    const [blnLoading, setBlnLoading] = useState(true);
    const[blnPopup, setBlnPopup] = useState(false)
    const[listPopupData, setListPopupData] = useState({
        title: "",
        content: [
            {}
            // {
            //     type: "input",
            //     label: "Username",
            // },
            // {
            //     type: "input",
            //     label: "Password",
            // }
        ],
        button:[
            {}
            // { 
            //     text: 'Ok',
            //     blnDisable: false,
            //     style: 'primary',
            // },
            // { 
            //     text: 'Cancel',
            //     blnDisable: false,
            //     style: 'danger',
            // }
            
        ],
        footer: ''
    })
    const popupCallback = async(childData: boolean) =>{
        setBlnPopup(childData)
        if(childData && listPopupData.title == "Forgot your password"){
            const email = "jirapon.ja@mail.wu.ac.th"
            const response = await fetch('/api/support/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            })
            console.log(response.json())
        }
    }
    useEffect(() => {
        const timeout = setTimeout(()=> {
            setBlnLoading(false);
        },2500)
        console.log(getCookie("myToken"))
    })

    async function signup(){
        if(strConfirmPassword == strPassword){
            setBlnLoading(true);
            const params = await{
                name: strUsername,
                email: strEmail,
                password: strPassword,
            }

            const duplicateEmail = await fetch('/api/accounts/check-duplicate-email', {
                method: 'POST',
                body: JSON.stringify({strEmail}),
                headers: {
                    'Content-Type': 'application/json'
                },
                
            })
            const dEmail =  await duplicateEmail.json()
            console.log(dEmail)
            if( !dEmail){
                const response = await fetch('/api/accounts/create-account-one', {
                method: 'POST',
                body: JSON.stringify({params}),
                headers: {
                    'Content-Type': 'application/json'
                },
                    
                }).then((response)=>{
                    // Router.push('/api/accounts/get-accounts-all')
                    console.log(response);
                    document.cookie = `name=${response}`;
                }).catch((error)=>{
                    console.log(error)
                }) ;
            }
        }else ('password not match')    
    }
    async function login() {
        setBlnLoading(true)
        console.log("")
        const params = await {
            email: strEmail,
            password: strPassword
        }
        const response = await fetch('/api/accounts/signin', {
            method: 'POST',
            body: JSON.stringify({params}),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': "listUserInfo.token"
            },  
        })
        const responseData = await response.json()
        setBlnLoading(false)
        console.log(responseData)
        if (responseData.status == 'success') {
            setBlnPopup(true)
            setListPopupData(listPopupData =>({...listPopupData, title: responseData.status}))
            const timeout = setTimeout(() => {
                setBlnPopup(false)
            }, 1000);
            setCookie("myToken", responseData.token, {maxAge: 300});
            console.log(getCookie("myToken"))
        }else {
            setBlnPopup(true)
            setListPopupData(listPopupData =>({...listPopupData, title: responseData.status}))
            const timeout = setTimeout(() => {
                setBlnPopup(false)
            }, 1000);
        }
    }
    async function forgotPassword() {
        setListPopupData(listPopupData =>({...listPopupData, 
            title: "Forgot your password",
            content: [
                {
                    type: "input",
                    label: "Enter your email address",
                },
                // {
                //     type: "input",
                //     label: "Password",
                // }
            ],
            button:[
                { 
                    text: 'Reset Password',
                    blnDisable: false,
                    style: 'primary',
                },
                { 
                    text: 'Cancel',
                    blnDisable: false,
                    style: 'danger',
                },
            ]
        }))
        setBlnPopup(true)
    }
    return(
        <div >
            <Loader  isLoading = {blnLoading} />
            <Popup blnShow={blnPopup} data={listPopupData} parentCallback={popupCallback}/>
            <div className="">
                <div id="signin" className="d-flex">
                    <div className="form sign-in-container bg-glass" style={{backgroundColor: "white", height: '100vh'}}>
                        <div className="logo-text d-flex">
                           <Image src={'/favicon.ico'} width={'50px'} height={'50px'} /><h2 className="">INSTEADIZE</h2> 
                        </div>
                        
                        <h1>Log in to your account</h1>
                        <div className="form-control">
                            <form className="">
                                <TextInput lableName="Email" request={true} type="email" onInput={(e: string)=>setStrEmail(e)} alertMsg='' alertMsgStatus={false}/>
                                <TextInput lableName="Password" request={true} type="password" onInput={(e: string)=>setStrPassword(e)} alertMsg='' alertMsgStatus={false}/>
                            </form>
                            <div className="d-flex px-2">
                            <a className='link' onClick={e=>{forgotPassword()}}>forgot password?</a>
                            </div>
                            <button className="btn-primary" onClick={(e)=> login()}>Login</button> Don't have an account? <a className='link'>  Signup</a>

                        </div>
                    </div>
                    <div style={{padding: '48px'}}>
                        <div className="">
                           <h1 className="">Create Next App</h1> 
                        </div>
                        
                    </div>
                    
                </div>
                <div id="signup" className="d-flex">
                    <div style={{padding: '48px'}}>
                        <div className="">
                           <h1 className="">Create Next App</h1> 
                        </div>
                        
                    </div>
                    <div className="form sign-up-container bg-glass" style={{backgroundColor: "white", height: '100vh', justifyContent: 'flex-start'}}>
                        <div className="logo-text d-flex">
                           <Image src={'/favicon.ico'} width={'50px'} height={'50px'} /><h2 className="">INSTEADIZE</h2> 
                        </div>
                        <h1>Create your account</h1>
                        <div className="form-control">
                            <form className="">
                                <TextInput lableName="Username" request={true} type="text" onInput={(e: string)=>setStrUsername(e)} alertMsg='' alertMsgStatus={false}/>
                                <TextInput lableName="Email" request={true} type="email" onInput={(e: string)=>setStrEmail(e)} alertMsg='' alertMsgStatus={false}/>
                                <TextInput lableName="Password" request={true} type="password" onInput={(e: string)=>setStrPassword(e)} alertMsg='' alertMsgStatus={false}/>
                                <TextInput lableName="Confirm password" request={true} type="password" onInput={(e: string)=>{setStrConfirmPassword(e)}} alertMsg='' alertMsgStatus={false}/>
                                { strPassword !==strConfirmPassword? <div className="invalid-message">Password not match</div>:""}
                            </form>
                            <div className="d-flex px-2">
                                <input id="privacy-checkbox" type="checkbox" style={{width: '25px', height: '25px', marginRight: '10px'}}/>
                                <label htmlFor="privacy-checkbox">I agree the <a className="link">Privacy Policy</a> and <a className="link">Terms of Service</a>.</label>
                            </div>
                            <button className="btn-primary" onClick={(e)=> signup()}>SIGN UP</button> Have an account? <a className='link'>Log in now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication;