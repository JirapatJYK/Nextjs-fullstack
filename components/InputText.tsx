import { useEffect, useState } from "react"

export default function InputText({lableName, request, type}:{lableName: String, request: Boolean, type: any}){
    const[text, setText] = useState("");
    const[alert, setAlert] = useState("");
    function checkInput(){
        if(text == ""){

        }
    }
    // const[required, setRequired] = useState("");
    useEffect(()=> {
        let e = document.getElementById("text");
        if(request){
            e?.setAttribute("required", "true")
        }
        
        // if( text == ""){
        //     e?.setAttribute("invalid", "true")
        // }
        // if(text == ""){
        //     e?.setAttribute("invalid", "true")
        // }else {
        //     e?.setAttribute("invalid", "false")
        // }
    })
    return (
        <div className="input-container" >
            <input id="text" type={type} value={text} onChange={(e)=>{setText(e.target.value)}}></input>
            <span></span>
            <label>{lableName}</label>                        
        </div>
    )
}