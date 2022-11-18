type Props = {
    onInput: Function
}
export default function Dropzone(props: Props){
    return(
        <>
            <div className="dropzone-container">
                <a className="clear-dropzone">X</a>
                <input type="file" onChange={(e)=>{props.onInput(e.target.files)}}></input>
            </div>
        </>
    )
}