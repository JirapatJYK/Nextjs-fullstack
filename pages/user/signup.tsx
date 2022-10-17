// import { ObjectId } from "mongodb";
import { NextPage } from "next";
import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader";
import TextInput from "../../components/TextInput";

const Signup: NextPage = () => {
    const [strUsername, setStrUsername] = useState("");
    const [strEmail, setStrEmail] = useState('');
    const [strPassword, setStrPassword] = useState('');
    const [strConfirmPassword, setStrConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const usernameRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const emailRef = useRef()
    useEffect(() => {
        const timeout = setTimeout(()=> {
            setIsLoading(false);
        },2500)
    })
    function handler(){}
    async function signup(){
        if(strConfirmPassword == strPassword){
                // usernameRef.current!= undefined ? console.log(usernameRef.current.alertRequest(): ''
            console.log(usernameRef.current)
            setIsLoading(true);
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
    return(
        <div >
            <Loader  isLoading = {isLoading} />
            <div className="container">
                <div className="form bg-glass">
                    <h1>Sign up</h1>
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
                    <button className="btn-primary" onClick={(e)=> signup()}>SIGN UP</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;