// import { ObjectId } from "mongodb";
import { getCookies, deleteCookie, setCookie } from 'cookies-next';

import { NextPage } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import InputText from "../../components/InputText";
import Loader from "../../components/Loader";
import Popup from '../../components/Popup';

const Signin: NextPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [accountID, setAccountID] = useState('');
    const [isPopup, setIsPopup] = useState(false);
    const [popupData, setPopupData] = useState(
        {
            title: "Sign in success",
            content: [
                {
                    type: "input",
                    label: "Name",
                },
                {
                    type: "text",
                    label: "Name",
                }
            ],
            button:[
                { 
                    text: 'OK',
                    blnDisable: false,
                    style: 'primary',
                },
                { 
                    text: 'Cancel',
                    blnDisable: false,
                    style: 'danger',
                }
                
            ],
            footer: ''
        }
    )
    useEffect(() => {
        const timeout = setTimeout(()=> {
            setIsLoading(false);
            // setIsPopup(false);
        },2500)
    })
    async function signin(){
        setIsLoading(true);
        const params = await{
            userName: name,
            password: password,
        }
        const response = await fetch('/api/accounts/signin', {
            method: 'POST',
            body: JSON.stringify({params}),
            headers: {
                'Content-Type': 'application/json'
            },  
        })
        const data = await response.json();
        console.log(data);
        setIsPopup(true);
        if(data.status == 'success'){
            await setAccountID(data.id)
            await setCookie("accountID", data.id ,{maxAge: 60})
            setPopupData({
                title: "Sign in success",
                content: [
                    {
                        type: "input",
                        label: "Name",
                    },
                    {
                        type: "text",
                        label: "Name",
                    }
                ],
                button:[
                    { 
                        text: 'OK',
                        blnDisable: false,
                        style: 'primary',
                    },
                    { 
                        text: 'Cancel',
                        blnDisable: false,
                        style: 'danger',
                    }
                    
                ],
                footer: ''
            })
        }
        
        const timeout = setTimeout(()=> {
            setIsPopup(false);
            // setIsPopup(false);
        },2500)
        
    }
    function testPopup(){
        setIsPopup(true);
        setPopupData({
            title: "testPopup",
            content: [
                {
                    type: "text",
                    label: "Name",
                }
            ],
            button:[
                { 
                    text: 'OK',
                    blnDisable: false,
                    style: 'primary',
                },
                { 
                    text: 'Cancel',
                    blnDisable: false,
                    style: 'danger',
                }
                
            ],
            footer: 'aaaaa'
        })
        
    }
    function testPopup2(){
        setIsPopup(true);
        setPopupData({
            title: "Login",
            content: [
                {
                    type: "input",
                    label: "Username",
                },
                {
                    type: "input",
                    label: "Password",
                }
            ],
            button:[
                { 
                    text: 'Login',
                    blnDisable: false,
                    style: 'primary',
                },
                { 
                    text: 'Cancel',
                    blnDisable: false,
                    style: 'danger',
                }
                
            ],
            footer: ''
        })
        // console.log()
        // const timeout = setTimeout(()=> {
        //     setIsPopup(false);
        //     // setIsPopup(false);
        // },2500)
    }
    const  popupCallback =(childData: boolean) =>{
        setIsPopup(childData)
    }
    return(
        <div >
            <Loader  isLoading = {isLoading} />
            <Popup
                blnShow={isPopup} 
                data={popupData}
                parentCallback={popupCallback}
            />
            <div className="container">
                <div className="form bg-glass">
                    {accountID}
                    <div>{JSON.stringify(getCookies())}</div>
                    <h1>Sign in</h1>
                    <div className="form-control">
                    <form className="">
                        <div className="input-container" >
                            <input id="name" type="text" value={name} onChange={(e)=>{setName(e.target.value)}} required></input>
                            <label>User Name</label>                        
                        </div>
                        <div className="input-container" >
                            <input id="email" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required></input>
                            <label>Email</label>
                        </div>
                        <div className="input-container">
                            <input id="password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required></input>
                            <label>Password</label>  
                        </div>
                        <div>
                            <input type="checkbox"/><span>I agree to the Terms of Service and Privacy Policy.</span>
                        </div>

                        {/* <button type="secondary" onClick={(e)=> signup()}>SIGN UP</button>
                        <button type="tertiary" onClick={(e)=> signup()}>SIGN UP</button> */}

                    </form>
                    <button onClick={(e)=> signin()}>SIGN IN</button>
                    <button onClick={(e)=> testPopup()}>TEST POPUP</button>
                    <button onClick={(e)=> testPopup2()}>Login</button>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin;