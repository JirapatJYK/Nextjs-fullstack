import { useEffect, useState } from "react"
// validation / btn clear input
export default function TextInput({lableName, request, type, onInput}:{lableName: String, request: Boolean, type: any, onInput: any}){
    const[text, setText] = useState("");
    const[invalid, setInvalid] = useState(false);

    // const[required, setRequired] = useState("");
    useEffect(()=> {
        let e = document.getElementById('text')
        if(request){
            e?.setAttribute("required", "true")
        }
        validation()? setInvalid(true): setInvalid(false)
        if(text != ""){
            onInput(text)
        }
    })
    function checkHaveData(){
        if(text == '')
        return true
        return false
    }
    function validation(){
        if(text == '')
        return true
        return false
    }
    function clearInput(e: any){
        setText('')
    }
    return (
        <div style={{marginBottom: "20px"}}>
        <div className={invalid? "input-container text-invalid": "input-container"} >
            <span>
                <input id="text" type={type} value={text} onChange={(e)=>{setText(e.target.value)}} ></input>
                <button className="btn-clear-input" onClick={(e)=>{clearInput(e)}}>X</button>
                {/* <div className='clear-btn'></div> */}
                <label>{lableName}</label>  
            </span>
            <span></span>                  
        </div>
        {invalid? <div className="invalid-message">invalid message</div>:''}
        
        </div>
    )
}