import { useState } from "react"
import TextInput from "./TextInput";

type Props = {
    animate: string,
    isShow: boolean,
    title: string,
    content: {
        type: string,
        itemProps: {}
    }[],
    button?: {
        label: string,
        isDisabled: boolean,
        style: string
        action?: any,
    }[],
}
export default function Popup(props:Props){
    // const [action, setAction] = useState(false)
    // function emitData(action: Boolean){
    //     props.confirm(action)
    // }
    console.log("popup")
    return (
        <>
            {props.isShow?
                <div style={{backgroundColor: "black", width:"100vw", height:"100vh"}}>
                    <div className="popup">
                        {
                            props.animate=='success' ?
                            <div className="success-checkmark">
                                <div className="check-icon">
                                    <span className="icon-line line-tip"></span>
                                    <span className="icon-line line-long"></span>
                                    <div className="icon-circle"></div>
                                    <div className="icon-fix"></div>
                                </div>
                            </div>
                            : <>
                                    <div className="popup-header">
                                        <h1>{props.title}</h1>
                                    </div>
                                    <div className="popup-body">
                                        <div className="popup-content">
                                            {
                                                props.content.map((item: any, index: Number) => {
                                                    return (
                                                    <>
                                                        {item.type=='input'? <TextInput {...item.itemProps}/>:item.type=='text'? <a style={{color: '#cdcdcd'}}>{item.itemProps.label}</a>:''}
                                                    </>)
                                                })
                                            }
                                        </div>
                                        {
                                            props.button?.length !== 0?
                                            <div className="popup-button">
                                                {
                                                    props.button?.map((item: any, index: Number) => {
                                                        return (
                                                        <>
                                                            {item.style=='primary'? <button className="btn-primary" disabled={item.isDisabled} onClick={(e)=>{item.action()}}>{item.label}</button>: <button className="btn-danger" disabled={item.isDisabled} onClick={(e)=>{item.action(false)}}>{item.label}</button>}
                                                        </>)
                                                    })
                                                }
                                            </div>:''
                                        }
                                    </div>
                                </>
                        }
                        
                        
                        {/* {
                            props.footer != undefined?<div className="popup-footer">{props.footer}</div>:''
                        }  
                         */}
                    </div>
                </div>: ''
            }
            
        </>
        
    )
}