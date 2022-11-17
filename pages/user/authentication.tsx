// import { ObjectId } from "mongodb";
import { getCookie, setCookie } from "cookies-next";
import { NextPage } from "next";
import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader";
import Popup from "../../components/Popup";
import TextInput from "../../components/TextInput";
import Image from "next/image";
import SmallBackground1 from "../../components/SmallBackground1";

const Authentication: NextPage = () => {
    
    
    
    const [strConfirmPassword, setStrConfirmPassword] = useState('');
    const [blnLoading, setBlnLoading] = useState(true);
    const [animate, setAnimate] = useState('');

    const[blnPopup, setBlnPopup] = useState(false)
    const[trigger, setTrigger] = useState(false);


    const [strUsername, setStrUsername] = useState("");
    const[usernameProps, setUsernameProps] = useState({
        required: true,
        labelName: "Username",
        value: "",
        type: "text",
        onInput: setStrUsername,
        validate: "InitialEN",
        trigger: false,
    })
    const [strEmail, setStrEmail] = useState('');
    const[emailProps, setEmailProps] = useState({
        required: true,
        labelName: "Email",
        value: "",
        type: "email",
        onInput: setStrEmail,
        validate: "InitialEN",
        trigger: false,
    })
    const [strPassword, setStrPassword] = useState('');
    const[passwordProps, setPasswordProps] = useState({
        required: true,
        labelName: "Create your password",
        value: "",
        type: "password",
        onInput: setStrPassword,
        validate: "",
        trigger: false,
    })
    const [strPassword1, setStrPassword1] = useState('');
    const[password1Props, setPassword1Props] = useState({
        required: true,
        labelName: "Confirm your password",
        value: "",
        type: "password",
        onInput: setStrPassword1,
        validate: "",
        trigger: false,
    })

    const emailForReset = useRef('');
    function setEmail(email: string) {
        emailForReset.current = email;
    }
    const[listPopupData, setListPopupData] = useState({
        animate: animate,
        isShow: blnPopup,
        title: "Forgot Password?",
        content: [
            {
                type: "text",
                itemProps: {
                    label: "Enter your email address",
                }
            },
            {
                type: "input",
                itemProps: {
                    required: true,
                    labelName: "Email",
                    value: "",
                    type: "email",
                    onInput: setEmail,
                    validate: "",
                    trigger: false,
                }
            }
        ],
        button: [
            {
                label: "Confirm",
                isDisabled: false,
                style: "primary",
                action: sendForgotPassword,
            },
            {
                label: "Cancel",
                isDisabled: false,
                style: "danger",
                action: closePopup,
            }
        ],
    })

    function closePopup(close: boolean){
        console.log(close);
        setListPopupData(listPopupData =>({...listPopupData, isShow: close}));

    }
    const[accountData, setAccountData] = useState(
        {
            
        }
    )


    async function sendForgotPassword() {
        setBlnLoading(true);
        const email = emailForReset.current;
        console.log(email)
        const response = await fetch('/api/support/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        })
        setBlnLoading(false);
        setAnimate('success');
        console.log(await response.json())
        
    }
    useEffect(() => {
        const timeout = setTimeout(()=> {
            setBlnLoading(false);
        },2500)
    },[])

    async function signup(){
        setTrigger(true);
        if(strConfirmPassword == strPassword){
            setBlnLoading(true);
            const params = await{
                username: strUsername,
                email: strEmail,
                password: strPassword,
            }

            // const duplicateEmail = await fetch('/api/accounts/check-duplicate-email', {
            //     method: 'POST',
            //     body: JSON.stringify({strEmail}),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
                
            // })
            // const dEmail =  await duplicateEmail.json()
            // console.log(dEmail)
            // if( !dEmail)
            {
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
        setEmailProps({...emailProps, trigger: true});

        setBlnLoading(true)
        console.log("")
        const params = await {
            username: strEmail,
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
            setCookie("myToken", responseData.token);
            setCookie("myAvatar", responseData.data.avatar, {maxAge: 300});
            setCookie("myName", responseData.data.username, {maxAge: 300});
            setCookie("myWallet", responseData.data.username, {maxAge: 300});
            setCookie("myCredits", responseData.data.username, {maxAge: 300});
            setCookie("myGems", responseData.data.username, {maxAge: 300});

            Router.push('/');
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
        
        setListPopupData(listPopupData =>({...listPopupData, isShow: true}))
    }
    return(
        <div >
            <Loader  isLoading = {blnLoading}/>
            <Popup {...listPopupData}/>
            <div className="">
                <div id="signin" className="">
                    <div className="form sign-in-container" style={{backgroundColor: "#ffffff", minHeight: '100vh', minWidth: '320px'}}>
                        <div className="logo-text d-flex">
                           <Image src={'/favicon.ico'} width={'50px'} height={'50px'} /><h2 className="">INSTEADIZE</h2> 
                        </div>
                        
                        <div className="form-control">
                            <h2 style={{color: "#000"}}>Log in to your account</h2>
                            <form className="light-form">
                                {/* <pre>{JSON.stringify(emailProps)}</pre> */}
                                <TextInput {...emailProps}/>
                                <TextInput {...passwordProps}/>
                            </form>
                            <div className="d-flex px-2">
                            <a className='link' onClick={e=>{forgotPassword()}}>forgot password?</a>
                            </div>
                            <button className="bg-primary" onClick={(e)=> login()}>Login</button> Don&apos;t have an account? <a className='link'>  Signup</a>

                        </div>
                    </div>
                    <div style={{zIndex: -1}}>
                        {/* <div className="">
                           <h1 className="">{emailForReset.current }Create Next App</h1> 
                        </div> */}
                        <SmallBackground1/>
                    </div>
                    
                </div>
                <div id="signup" className="">
                    <div style={{zIndex: -1}}>
                        {/* <div className="">
                           <h1 className="">Create Next App</h1> 
                        </div> */}
                        <SmallBackground1/>
                    </div>
                    <div className="form sign-up-container" style={{backgroundColor: "white", minHeight: '100vh', justifyContent: 'flex-start'}}>
                        <div className="logo-text d-flex">
                           <Image src={'/favicon.ico'} width={'50px'} height={'50px'} /><h2 className="">INSTEADIZE</h2> 
                        </div>
                        
                        <div className="form-control">
                            <h2 style={{color: "#000"}}>Create your account</h2>
                            <form className="light-form">
                                {/* <TextInput lableName="Username" request={true} value='' type="text" onInput={(e: string)=>setStrUsername(e)} alertMsg='' alertMsgStatus={false}/>
                                <TextInput lableName="Email" request={true} value='' type="email" onInput={(e: string)=>setStrEmail(e)} alertMsg='' alertMsgStatus={false}/>
                                <TextInput lableName="Password" request={true} value='' type="password" onInput={(e: string)=>setStrPassword(e)} alertMsg='' alertMsgStatus={false}/>
                                <TextInput lableName="Confirm password" request={true} value='' type="password" onInput={(e: string)=>{setStrConfirmPassword(e)}} alertMsg='' alertMsgStatus={false}/> */}
                                <TextInput {...usernameProps}/>
                                <TextInput {...emailProps}/>
                                <TextInput {...passwordProps}/>
                                <TextInput {...password1Props}/>
                                { strPassword !==strConfirmPassword? <div className="invalid-message">Password not match</div>:""}
                            </form>
                            <div className="d-flex px-2">
                                <input id="privacy-checkbox" type="checkbox" style={{width: '25px', height: '25px', marginRight: '10px'}}/>
                                <label htmlFor="privacy-checkbox">I agree the <a className="link">Privacy Policy</a> and <a className="link">Terms of Service</a>.</label>
                            </div>
                            <button className="bg-primary" onClick={(e)=> signup()}>SIGN UP</button> Have an account? <a className='link'>Log in now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication;