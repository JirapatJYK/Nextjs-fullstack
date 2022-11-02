import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
// validation / btn clear input
export default function TextInput({lableName, request, type, onInput, alertMsg, alertMsgStatus}:{lableName: String, request: Boolean, type: any, onInput: any, alertMsg: String, alertMsgStatus: Boolean}){
    const[text, setText] = useState("");
    const[blnAlertStatus, setBlnAlertStatus] = useState(true);
    const[alertMessage, setAlertMessage] = useState("alert");

    // const[required, setRequired] = useState("");
    useEffect(()=> {
        let e = document.getElementById('text')
        if(request){
            e?.setAttribute("required", "true")
        }
        if(text != ""){
            onInput(text)
        }
        // setBlnValid(alertRequest())
    })
    
    function validation(inputText: string){
        setText(inputText)
        // if (this.validate == "InitialEN") {
        //     if (/^[A-Za-z-.()_/ ]+$/.test(char)) {
        //         this.alertMsgStatus = false;
        //     } else {
        //         this.alertMsgStatus = true;
        //         this.alertMsgInput = "231";
        //         e.preventDefault();
        //     }
        // }
        var textValidation = type == 'password'? /^[A-Za-z]\w{7,14}$/: '';
        const alertMessage = type == 'password'? 'Password must contain at least 6 characters, including UPPER/lowercase and numbers': '';
        setAlertMessage(alertMessage)
        if(inputText.match(textValidation))
        setBlnAlertStatus(true)
        setBlnAlertStatus(false)

    }
    function clearInput(e: any){
        setText('')
    }
    function alertRequest(){
        if(request &&text == ''){
            setAlertMessage(`Please enter a ${lableName}`)
            return false
        }
        return true
    }
    return (
        <div style={{margin: "20px 0"}}>
        <div className={!blnAlertStatus? "input-container text-invalid": "input-container"} >
            <span>
                <input id="text" type={type} value={text} onChange={(e)=>{validation(e.target.value)}} ></input>
                {text!=''? <button className="btn-clear-input" onClick={(e)=>{clearInput(e)}}>X</button>: ''}
                {/* <div className='clear-btn'></div> */}
                <label htmlFor="text">{lableName}</label>  
            </span>
            <span></span>                  
        </div>
        {!blnAlertStatus? <div className="invalid-message">{alertMessage}</div>:''}
        
        </div>
    )
}
// First name must be between 1 and 20 characters long
// Last name must be between 1 and 20 characters long
// Your password must:
    // Contain at least 8 characters
    // Contain unique characters, numbers, or symbols
    // Not contain your email address

//     const TextInput = forwardRef(({lableName, request, type, onInput, ref}:{lableName: String, request: Boolean, type: any, onInput: any, ref: any}) =>{
//     const[text, setText] = useState("");
//     const[blnAlertStatus, setBlnAlertStatus] = useState(true);
//     const[alertMessage, setAlertMessage] = useState("alert");

//     // const[required, setRequired] = useState("");
//     useEffect(()=> {
//         let e = document.getElementById('text')
//         if(request){
//             e?.setAttribute("required", "true")
//         }
//         if(text != ""){
//             onInput(text)
//         }
//         // setBlnValid(alertRequest())
//     })
    
//     function validation(inputText: string){
//         setText(inputText)
//         // if (this.validate == "InitialEN") {
//         //     if (/^[A-Za-z-.()_/ ]+$/.test(char)) {
//         //         this.alertMsgStatus = false;
//         //     } else {
//         //         this.alertMsgStatus = true;
//         //         this.alertMsgInput = "231";
//         //         e.preventDefault();
//         //     }
//         // }
//         var textValidation = type == 'password'? /^[A-Za-z]\w{7,14}$/: '';
//         const alertMessage = type == 'password'? 'Password must contain at least 6 characters, including UPPER/lowercase and numbers': '';
//         setAlertMessage(alertMessage)
//         if(inputText.match(textValidation))
//         setBlnAlertStatus(true)
//         setBlnAlertStatus(false)

//     }
//     function clearInput(e: any){
//         setText('')
//     }
//     function alertRequest(){
//         if(request &&text == ''){
//             setAlertMessage(`Please enter a ${lableName}`)
//             return false
//         }
//         return true
//     }
//     useImperativeHandle(ref, () => ({
//         showAlert() {
//           alert("Hello from Child Component")
//         },
//         alertRequest(){
//             if(request &&text == ''){
//                 setAlertMessage(`Please enter a ${lableName}`)
//                 return false
//             }
//             return true
//         },
        
//       }))
//     return (
//         <div style={{marginBottom: "20px"}}>
//         <div className={!blnAlertStatus? "input-container text-invalid": "input-container"} >
//             <span>
//                 <input id="text" type={type} value={text} onChange={(e)=>{validation(e.target.value)}} ></input>
//                 {text!=''? <button className="btn-clear-input" onClick={(e)=>{clearInput(e)}}>X</button>: ''}
//                 {/* <div className='clear-btn'></div> */}
//                 <label htmlFor="text">{lableName}</label>  
//             </span>
//             <span></span>                  
//         </div>
//         {!blnAlertStatus? <div className="invalid-message">{alertMessage}</div>:''}
        
//         </div>
//     )
// })
// export default TextInput
