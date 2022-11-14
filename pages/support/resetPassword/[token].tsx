import { getCookie } from "cookies-next";
import { useState } from "react"
import TextInput from "../../../components/TextInput";

export default function ResetPassword(){
    const[strPassword, setStrPassword]= useState('');
    const[strPassword1, setStrPassword1]= useState('');
    const[passwordProp, setPasswordProps] = useState({
        required: true,
        labelName: "Create new password",
        value: "",
        type: "password",
        onInput: setStrPassword,
        validate: "Password",
        trigger: false,
    })
    const[password1Prop, setPassword1Props] = useState({
        required: true,
        labelName: "Confirm your password",
        value: "",
        type: "password",
        onInput: setStrPassword1,
        validate: "Password",
        trigger: false,
    })
    async function save(){
        const myToken = getCookie("myToken")?.toString()
        if(strPassword === strPassword1){
            const response = await fetch('/api/accounts/edit-account-one', {
                method: 'POST',
                body: strPassword1,
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': myToken!== undefined ? myToken : ''
                },
                    
                })
        }
    }
    return(
        <>
            <div id="signup" className="form sign-up-container">
                <h1>Reset your account</h1>
                <div className="form-control">
                <form className="">
                    {/* <TextInput lableName="Username" request={true} type="text" onInput={(e: string)=>setStrUsername(e)} alertMsg='' alertMsgStatus={false}/> */}
                    {/* <TextInput lableName="Email" request={true} type="email" onInput={(e: string)=>setStrEmail(e)} alertMsg='' alertMsgStatus={false}/> */}
                    <TextInput {...passwordProp}/>
                    <TextInput {...password1Prop}/>
                    { strPassword !==strPassword1? <div className="invalid-message">Password not match</div>:""}
                </form>
                <button className="btn-primary" onClick={(e)=> save()}>SAVE PASSWORD</button>

                </div>
            </div>
        </>
    )
}