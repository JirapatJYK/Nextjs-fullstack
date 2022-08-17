import Image from "next/image";
import Router from "next/router";
import { useEffect } from "react";



const MediaCard=({metadata}:{metadata: any})=> {
    
    function mediatype(){
        switch(metadata.type) {
            case "image":
                return  <Image src={metadata.media} width="320px" height="320px" style={{background: `${metadata.background}`}} onClick={()=>{Router.push(metadata.media)}}></Image>
            break;
            case "video":
                return  <video width="320"  controls src={metadata.media}/>
            break;
            case "audio":
                return  <>
                            <div style={{width: "320px", height: "240px",backgroundImage: `${metadata.background}`, backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
                            </div>
                            <audio controls src={metadata.media}/>
                        </>
            break;
        }
    }
    useEffect(()=>{
        mediatype();
    })
    return(
        <>
            <div className="card">
                <div className='card-content' >
                    {mediatype()}
                </div>
                <div className='card-info'>
                    <div>
                        <h4>Name: {metadata.name}</h4>
                        <span><p>Description: {metadata.description} </p></span>
                        <span><p>External link:  <a className="link" href={metadata.media}>{metadata.media}</a></p></span>
                        <span><h4>Price</h4> 1000 THB </span>
                    </div>
                    <button type="button" className="field-btn btn-primary">Buy now</button>
                </div>
            </div>
        </>
    )
}

export default MediaCard;