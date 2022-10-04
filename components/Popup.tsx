export default function Popup(
    {
        blnShow,
        data}
        :{blnShow : Boolean, data: any}){
    return (
        <>
            {blnShow?
                <div className="loader-bg">
                    <div className="popup">
                        <div className="popup-header">
                            <h1>{data.title}</h1>
                        </div>
                        <div className="popup-body">
                            <div className="content"></div>
                        </div>
                        {
                            data.button.lenght !== 0?
                            <div className="popup-button">
                                {
                                    data.button.map((item: any, index: Number) => {
                                        return (
                                        <>
                                            {item.style=='primary'? <button className="btn-primary" disabled={item.blnDisable} >{item.text}</button>: <button className="btn-danger" disabled={item.blnDisable}>{item.text}</button>}
                                        </>)
                                    })
                                }
                            </div>:''
                        }
                            
                        <div className="popup-footer"></div>
                    </div>
                </div>: ''
            }
            
        </>
        
    )
}