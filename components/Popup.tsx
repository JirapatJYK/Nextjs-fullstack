export default function Popup(
    {
        blnShow, 
        title, 
        icon, 
        blnConfirmBtn,
        blnCancelBtn,
        strConfirmBtn,
        strCancelBtn,
        objContent}
        :{blnShow : Boolean, title: String, icon: String, blnConfirmBtn: Boolean, blnCancelBtn: Boolean, strConfirmBtn: String, strCancelBtn: String, objContent: Object}){
    return (
        <>
            {blnShow?
                <div className="loader-bg">
                    <div className="popup">
                        <div className="popup-header">
                            <h1>{title}</h1>
                        </div>
                        <div className="popup-body">
                            <div className="content"></div>
                        </div>
                        {
                            blnCancelBtn || blnConfirmBtn !== false?
                            <div className="popup-button">
                                {
                                    blnCancelBtn? <button className="btn-primary">{strConfirmBtn}</button>: ''
                                }
                                {blnCancelBtn? <button className="btn-danger">{strCancelBtn}</button>: ''}
                                <button className="btn-danger" disabled={true}>{strCancelBtn}</button>
                            </div>:''
                        }
                            
                        <div className="popup-footer"></div>
                    </div>
                </div>: ''
            }
            
        </>
        
    )
}