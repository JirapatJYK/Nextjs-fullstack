// import { ObjectId } from "mongodb";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const signup: NextPage = () => {
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
        const response = await fetch('/api/account/create-account', {
            method: 'POST',
            body: JSON.stringify({params}),
            headers: {
                'Content-Type': 'application/json'
            },
            
        }).then((response)=>{
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
                        <div>
                            <label>Username<span id="nameValidation" style={{color: 'red'}}>*</span></label>
                            <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>{setName(e.target.value)}} required></input>
                            <span id="nameValidation" style={{color: 'red'}}></span>
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="email" placeholder="Enter your email address" value={email} onChange={(e)=>{setEmail(e.target.value)}} required></input>
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>{setPassword(e.target.value)}} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required></input>
                        </div>
                        <div>
                            <input type="checkbox"/><span>I agree to the Terms of Service and Privacy Policy.</span>
                        </div>
                        <button type="submit" onClick={(e)=> signup()}>SIGN UP</button>

                        {/* <button type="secondary" onClick={(e)=> signup()}>SIGN UP</button>
                        <button type="tertiary" onClick={(e)=> signup()}>SIGN UP</button> */}

                    </form>

                    <button onClick={(e)=>{
                        setIsLoading(true);
                        console.log(document.cookie)}}>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default signup;