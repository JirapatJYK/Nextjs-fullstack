
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import Navbar from "../components/Navbar";

const Create:NextPage =()=>{
    const [media, setMedia] = useState();
    const [mediaUrl, setMediaUrl] = useState('');
    const[name, setName] = useState('');
    const[description, setDescription] = useState('');
    const[external, setExternal] = useState('');
    const[type, setType] = useState('');
    const[background, setBackground] = useState('');
    const[src, setSrc] = useState('');
    const[bgType, setBgtype] = useState('');

    function setAudioBg(e:any){
        const image = e.target.files[0];
        // setSrcBg(URL.createObjectURL(image))
        if(image){
            setBgtype("backgroundImage")
            setBackground(`url(${URL.createObjectURL(image)})`)
        }
        
    }
    function setFile(e:any){
        const file = e.target.files[0];
        if(file != null){
            setSrc(URL.createObjectURL(file))
            setMedia(file[0]);
            console.log(file);
            setType(file.type.split("/")[0]);
        }
    }
    function creatItem(){
        // const formData = new FormData();
        // formData.append("file", media)
        // console.log(formData.get("file"));
        const params = media
        console.log(params);

        fetch('/api/upload ', {
            method: 'POST',
            body: JSON.stringify({params}),
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => response.json())
        .then((result) => {
            // result = (result.url);
            if(bgType == "backgroundImage"){
                
            }
            mint(result.url)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function mint(url: string) {
        const params = {
            name: name,
            description: description,
            external_url: external,
            type: type,
            media: url,
            background: background,
        }
        console.log(params);

        fetch('api/contract/mint', {
            method: 'POST',
            body: JSON.stringify({params}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            console.log(response.json());
        })
        .catch((error) => {
            console.log(error)
        })
    }



    function previewRender(){
        if(type === "image"){
            return (
                <div>
                {/* <div className="card"> */}
                    {/* <div className='card-content' > */}
                        <Image src={src} id="blah" width="320px" height="320px"  style={{background: `${background}`}}></Image>
                    {/* </div> */}
                </div>
            )
        }else if(type === "video"){
            return (
                <video width="320"  controls src={src}/>
            )
        }else if(type === "audio"){
            if(bgType == "backgroundImage"){
                return(
                    <div>
                        <audio controls src={src} style={{width: "320px", height: "240px", backgroundImage: `${background}`, backgroundRepeat: "no-repeat", backgroundPosition: "center"}}/>
                    </div>
                )
            }else {
                return(
                    <div>
                        <audio controls src={src} style={{width: "320px", height: "240px", background: `${background}`}}/>
                    </div>
                )
                
            }
            
        }

    }

    function audioBackground(){
        if(type === "audio"){
            
            return(
                <input type="file" accept="image" onChange={(e)=>setAudioBg(e)} />
            )
        }
        
    }
    return(
        <>
            <Navbar/>
            <div className="container">
                <div className="form">
                    <h1>Create New Item</h1>
                    <div>
                        {/* previewer */}
                    </div>
                    <div>
                        <div className="form-control">
                            <form>
                                <input type="file" onChange={(e)=>setFile(e)} />
                                <div>{audioBackground()}</div>
                                <input type="text" placeholder="Name" name="name" onChange={(e)=>setName(e.target.value)}></input>
                                <input type="text" placeholder="description" name="description" onChange={(e)=>setDescription(e.target.value)}></input>
                                <input type="text" placeholder="External Link" name="external" onChange={(e)=>setExternal(e.target.value)}></input>
                                <input type="color" placeholder="Background" name="background" onChange={(e)=>{ setBgtype("background");setBackground(e.target.value)}}></input>
                            </form>
                            <button onClick={(e)=>{creatItem()}}>Create Item</button>
                        </div>
                    </div>
                </div>
                <div>
                    {previewRender()}
                </div>
                <div>
                    {name}
                    {description}
                    {external}
                    {media}
                </div>
            </div>
        </>
    )
}

export default Create;