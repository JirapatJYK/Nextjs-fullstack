import Image from "next/image";
import React ,{ useEffect, useRef, useState } from "react";

type Props = {
    background?: string;
    onInput: Function
}
export default function Dropzone(props: Props){
    // const[dropEvent, setDropEvent] = useState();
    function drop(e: any){
        console.log(e.target.files[0]);
        var input = (document.getElementById("dropzone") as HTMLInputElement);
        console.log(input?.value);
        if(input?.value !=''){
            clearInput();
        }else{
          e.stopPropagation();  
        }
        
    }

    const inputRef = useRef<null | HTMLInputElement>(null)
    const[type, setType] = useState('');
    const[background, setBackground] = useState('');
    const[src, setSrc] = useState('');
    const[bgType, setBgtype] = useState('backgroundImage');
    function clearInput(){
        
            console.log("ssss");
            var input = (document.getElementById("dropzone") as HTMLInputElement);
            console.log(input?.value);

            // input.value = null;
            console.log(input);
            
        setSrc('');
    }
    
    function previewRender(){
        return(
            <div>
                {
                    type === "image"?<Image src={src} id="blah" width="320px" height="320px"  style={{background: `${props.background}`}}></Image>:
                    type === "video"?<video width="320"  controls src={src}/>:
                    type === "audio"?bgType == "backgroundImage"?<audio controls src={src} style={{width: "320px", height: "240px", background: `${props.background}`, backgroundRepeat: "no-repeat", backgroundPosition: "center"}}/>:<audio controls src={src} style={{width: "320px", height: "240px", background: `${background}`}}/> :
                    type === "video"?<video width="320"  controls src={src}/>:''
                }
            </div>
        )
    }
    function SetFile(e:any){
        const file = e.target.files[0];
        if(file != null){
            setSrc(URL.createObjectURL(file))
            setType(file.type.split("/")[0]);
            props.onInput(e.target.files[0]);
        }else console.log("file not found");
        
    }
    useEffect(()=>{
        window.addEventListener("dragover",function(e){
            e.preventDefault();
        },false);

        window.addEventListener("drop",function(e){
            e.preventDefault();
        },false);
    })
    return(
        <>
            <div className="dropzone-container">
                {/* <input id="dropzone" type="file" onChange={(e)=>{setFile(e)}}></input> */}
                
                { src!= ''? previewRender(): <input id="dropzone" className="dropzone" onDrop={(e)=>{drop(e)}} type="file" onChange={(e)=>{SetFile(e)}}></input>}
                <a className="clear-dropzone" onClick={()=>{clearInput()}}>X</a>
            </div>
            

        </>
    )
}