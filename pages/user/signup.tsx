// import { ObjectId } from "mongodb";
import { NextPage } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import InputText from "../../components/InputText";
import Loader from "../../components/Loader";

const Signup: NextPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const timeout = setTimeout(()=> {
            setIsLoading(false);
        },2500)
    })
    async function signup(){
        setIsLoading(true);
        const params = await{
            name: name,
            email: email,
            password: password,
        }
        const response = await fetch('/api/accounts/create-account', {
            method: 'POST',
            body: JSON.stringify({params}),
            headers: {
                'Content-Type': 'application/json'
            },
            
        }).then((response)=>{
            // Router.push('/api/accounts/get-accounts-all')
            console.log(response.json());
            document.cookie = `name=${response}`;
        }).catch((error)=>{
            console.log(error)
        }) ;
    }
    return(
        <div >
            <Loader  isLoading = {isLoading} />
            <div className="container">
                <div className="form bg-glass">
                    <h1>Sign up</h1>
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
                        <InputText
                            lableName="Password" 
                            request={true} 
                            type={"password"}
                        />
                        <div>
                            <input type="checkbox"/><span>I agree to the Terms of Service and Privacy Policy.</span>
                        </div>

                        {/* <button type="secondary" onClick={(e)=> signup()}>SIGN UP</button>
                        <button type="tertiary" onClick={(e)=> signup()}>SIGN UP</button> */}

                    </form>
                    <button onClick={(e)=> signup()}>SIGN UP</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;