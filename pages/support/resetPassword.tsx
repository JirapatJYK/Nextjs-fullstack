import { useState } from "react"
import TextInput from "../../components/TextInput"

export default function ResetPassword(){
    const [strPassword, setStrPassword] = useState('')
    const [strConfirmPassword, setStrConfirmPassword] = useState('')
    function save(){

    }
    return(
        <>
            <div id="signup" className="form sign-up-container">
                <h1>Reset your account</h1>
                <div className="form-control">
                <form className="">
                    {/* <TextInput lableName="Username" request={true} type="text" onInput={(e: string)=>setStrUsername(e)} alertMsg='' alertMsgStatus={false}/> */}
                    {/* <TextInput lableName="Email" request={true} type="email" onInput={(e: string)=>setStrEmail(e)} alertMsg='' alertMsgStatus={false}/> */}
                    <TextInput lableName="Create new password" request={true} type="password" onInput={(e: string)=>setStrPassword(e)} alertMsg='' alertMsgStatus={false}/>
                    <TextInput lableName="Confirm your password" request={true} type="password" onInput={(e: string)=>{setStrConfirmPassword(e)}} alertMsg='' alertMsgStatus={false}/>
                    { strPassword !==strConfirmPassword? <div className="invalid-message">Password not match</div>:""}
                </form>
                <button className="btn-primary" onClick={(e)=> save()}>SAVE PASSWORD</button>

                </div>
            </div>
        </>
    )
}