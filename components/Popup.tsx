import { useState } from "react"

export default function Popup({ blnShow, data, parentCallback}:{ blnShow : Boolean, data: any, parentCallback: any}){
    // const [action, setAction] = useState(false)
    function emitData(action: Boolean){
        parentCallback(action)
    }
    return (
        <>
            {blnShow?
                <div className="loader-bg">
                    <div className="popup">
                        <div className="popup-header">
                            <h1>{data.title}</h1>
                        </div>
                        <div className="popup-body">
                            <div className="popup-content">
                                {
                                    data.content.map((item: any, index: Number) => {
                                        return (
                                        <>
                                            {item.type=='input'? <><label>{item.label}</label>{item.label== 'Password'?<input type='password' className="" placeholder={item.label+'...'}/>:<input className=""  placeholder={item.label+'...'}/>}</>:item.type=='text'? <a>{item.label}</a>:''}
                                        </>)
                                    })
                                }
                            </div>
                            {
                                data.button.lenght !== 0?
                                <div className="popup-button">
                                    {
                                        data.button.map((item: any, index: Number) => {
                                            return (
                                            <>
                                                {item.style=='primary'? <button className="btn-primary" disabled={item.blnDisable} onClick={(e)=>{emitData(true)}}>{item.text}</button>: <button className="btn-danger" disabled={item.blnDisable} onClick={(e)=>{emitData(false)}}>{item.text}</button>}
                                            </>)
                                        })
                                    }
                                </div>:''
                            }
                        </div>
                        
                        {
                            data.footer != undefined?<div className="popup-footer">{data.footer}</div>:''
                        }  
                        
                    </div>
                </div>: ''
            }
            
        </>
        
    )
}