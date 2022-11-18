
import { request } from "http";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import Dropzone from "../components/Dropzone";
import Navbar from "../components/Navbar";
import TextInput from "../components/TextInput";

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

    function creatItem(){
        uploadFile();

    }
    function uploadFile(){
        const formData = new FormData();
        formData.append("file", media)
        formData.append("creater", creater)
        formData.append("fileName", name)
        formData.append("description", description)

        fetch('/api/upload ', {
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

    const[nameProps, setNameProps] = useState({
        required: true,
        labelName: "Name",
        value: "",
        type: 'text',
        onInput: setName,
        validate: "",
        // trigger?: Boolean,
    })
    const[descriptionProps, setDescriptionProps] = useState({
        required: true,
        labelName: "Description",
        value: "",
        type: 'text',
        onInput: setDescription,
        validate: "",
        // trigger?: Boolean,
    })
    const[externalProps, setExternalPropsProps] = useState({
        required: true,
        labelName: "External link",
        value: "",
        type: 'text',
        onInput: setExternal,
        validate: "",
        // trigger?: Boolean,
    })
    const[backgroundProps, setBackgroundProps] = useState({
        required: true,
        labelName: "Background",
        value: "",
        type: 'text',
        onInput: setBackground,
        validate: "",
        // trigger?: Boolean,
    })
    const[dropzone, setDropzone] = useState({
        background: background,
        onInput: console.log
    })
    return(
        <>
            <Navbar/>
            <div className="container">
                <h1>Create New Item</h1>
                <div className="row" style={{margin: "auto", maxWidth: "1024px"}}>
                    <div className="col-5">
                        <div className="form">
                            
                                <div className="form-control">
                                    <form>
                                        <TextInput {...nameProps}/>
                                        <TextInput {...descriptionProps}/>
                                        <TextInput {...externalProps}/>
                                        <TextInput {...backgroundProps}/>
                                        {/* <input type="text" placeholder="Name" name="name" onChange={(e)=>setName(e.target.value)}></input>
                                        <input type="text" placeholder="description" name="description" onChange={(e)=>setDescription(e.target.value)}></input>
                                        <input type="text" placeholder="External Link" name="external" onChange={(e)=>setExternal(e.target.value)}></input> */}
                                        <input type="color" placeholder="Background" name="background" onChange={(e)=>{ setBgtype("background");setBackground(e.target.value)}}></input>
                                    </form>
                                    <button onClick={(e)=>{creatItem()}}>Create Item</button>
                                </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="form">
                            <div style={{marginTop: '40px'}}>
                                <Dropzone {...dropzone} />
                            </div>
                        </div>
                        <div>
                            {name}
                            {description}
                            {external}
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </>
    )
}

export default Create;