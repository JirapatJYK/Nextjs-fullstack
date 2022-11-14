import { useRouter } from "next/router";
import { useState } from "react";
import TextInput from "../../components/TextInput";

export default function ForgotPassword(){
    const router = useRouter();
    const { token } = router.query;

    const[strEmail, setStrEmail]= useState('');
    const[forgotPasswordProps, setForgotPasswordProps] = useState({
        required: true,
        labelName: "Your email",
        value: "",
        type: "text",
        onInput: setStrEmail,
        validate: "",
        trigger: false,
    })
    return(
        <>
            <div>
                {token}
                <TextInput {...forgotPasswordProps}/>
            </div>
        </>
    )
}