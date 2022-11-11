import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
// validation / btn clear input
type Props ={
    required: boolean;
    labelName: string,
    value: string,
    type: string,
    onInput?: any,
    validate?: string,
    trigger?: Boolean,
}
export default function TextInput(props: Props){
    const[text, setText] = useState("");
    const[blnAlertStatus, setBlnAlertStatus] = useState(false);
    const[alertMessage, setAlertMessage] = useState("alert");

    // const[required, setRequired] = useState("");
    useEffect(()=> {
        let e = document.getElementById('text')
        if(props.required){
            e?.setAttribute("required", "true")
        }
        if(text != ""){
            props.onInput(text)
        }
        if(props.trigger){
            console.log("trigger")
            nullCheck()
        }
        // setBlnValid(alertRequest())
    })
    useEffect(()=> {
        // const timeout = setTimeout(()=>{
            setText(props.value);
            if(props.trigger){
                console.log("trigger")
                nullCheck()
            }
        // },2500)
        
    },[])
    function nullCheck(){
        if(text == ""){
            setBlnAlertStatus(true);
            setAlertMessage("Please enter "+ props.labelName);
        }else {
            setBlnAlertStatus(false);
            if(props.validate)
                validation(text)
            }

    }
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
        var textValidation;
        let alertMessage;
        switch (props.validate){
            case "Password":
                textValidation = /^[A-Za-z]\w{7,14}$/
                alertMessage = `${props.labelName} must contain at least 6 characters, including UPPER/lowercase and numbers`;
            break;
            case "InitialEN":
                textValidation = /^[A-Za-z]\w{7,14}$/
                alertMessage = `${props.labelName} must be`;
            break;
            default: 
                textValidation= ''
                alertMessage = '';
            break;
        }
        // var textValidation = props.type == 'password'? /^[A-Za-z]\w{7,14}$/: '';
        setAlertMessage(alertMessage)
        if(inputText.match(textValidation))
        setBlnAlertStatus(false);
        else setBlnAlertStatus(true);

    }
    function clearInput(e: any){
        setText('')
    }
    function alertRequest(){
        if(props.required &&text == ''){
            setAlertMessage(`Please enter a ${props.labelName}`)
            return false
        }
        return true
    }
    return (
        <div style={{margin: "20px 0"}}>
        <div className={blnAlertStatus? "input-container text-invalid": "input-container"} >
            <span>
                <input id="text" type={props.type} value={text} onChange={(e)=>{validation(e.target.value)}} ></input>
                {text!=''? <button className="btn-clear-input" onClick={(e)=>{clearInput(e)}}>X</button>: ''}
                {/* <div className='clear-btn'></div> */}
                <label htmlFor="text">{props.labelName}</label>  
            </span>
            <span></span>                  
        </div>
        {blnAlertStatus? <div className="invalid-message">{alertMessage}</div>:''}
        
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
