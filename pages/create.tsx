
import { request } from "http";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import InputText from "../components/InputText";
import Navbar from "../components/Navbar";

const Create:NextPage =()=>{
    const [media, setMedia] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const[name, setName] = useState('');
    const[creater, setCreater] = useState('Creater');

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
            setMedia(file);
            console.log("have file" , media);  
            setType(file.type.split("/")[0]);
        }else console.log("file not found");
    }
    function creatItem(){
        uploadFile();

    }
    function uploadFile(){
        const formData = new FormData();
        formData.append("file", media)
        formData.append("creater", creater)
        formData.append("name", name)
        formData.append("description", description)
        formData.append("external_link", external)
        

        fetch('/api/upload/upload-file', {
            method: 'POST',
            body: formData,
        })
        .then((response) => {
           console.log("SUCCESS");
        })
        .then((result) => {
        })
        .catch((error) => {
            console.log(error);
        })
    }
    function deleteAll(){
        fetch('/api/upload/delete-upload-files-all', {
            method: 'DELETE',
        })
        .then((response) => {console.log("SUCCESS");}).catch((error) => {console.log(error);})
    }
    function getFilesAll(){
        fetch('/api/upload/get-upload-files-all', {
            method: 'GET',
        })
        .then((response) => {
            response.json().then((data) => {
                console.log(data);
            });
            // console.log(data);
        }).catch((error) => {
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
                <h1>Create New Item</h1>
                <div className="row" style={{margin: "auto", maxWidth: "1024px"}}>
                    <div className="col-5">
                        <div className="form">
                            
                            <div>
                                <div className="form-control">
                                    <form style={{backgroundColor: "var(--background-primary)", padding: "20px", width: "500px", borderRadius: "10px"}}>
                                        <input type="file" onChange={(e)=>setFile(e)} style={{marginBottom: "20px",}}/>
                                        <div>{audioBackground()}</div>
                                        {/* <InputText 
                                            lableName={"Name"} 
                                            request={true} 
                                            type={"text"}
                                        />
                                        <InputText lableName={"Description"} request={true} type={"text"}/>
                                        <InputText lableName={"External URL"} request={true} type={"email"}/> */}
                                        
                                        <input type="text" placeholder="Name" name="name" onChange={(e)=>setName(e.target.value)}></input>
                                        <input type="text" placeholder="description" name="description" onChange={(e)=>setDescription(e.target.value)}></input>
                                        <input type="text" placeholder="External Link" name="external" onChange={(e)=>setExternal(e.target.value)}></input>
                                        <input type="color" placeholder="Background" name="background" onChange={(e)=>{ setBgtype("background");setBackground(e.target.value)}}></input>
                                    </form>
                                    <button onClick={(e)=>{creatItem()}}>Create Item</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <div>
                            {previewRender()}
                        </div>
                        <div>
                            {name}
                            {description}
                            {external}
                        </div>
                    </div>
                    
                </div>
                
            </div>
            <button onClick={(e)=>{deleteAll()}}>Delete All</button>
            <button onClick={(e)=>{getFilesAll()}}>Get Files All</button>

        </>
    )
}

export default Create;