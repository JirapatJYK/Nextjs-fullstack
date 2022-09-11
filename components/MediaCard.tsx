import Image from "next/image";
import Router from "next/router";
import { useEffect } from "react";



const MediaCard=({metadata}:{metadata: any})=> {
    
    function mediatype(){
        // switch(metadata.type) {
        //     case "image":
                return(
                    <div className="card">    
                        <div className='card-content' >
                            <Image src={metadata.path} width="320px" height="320px" style={{background: `${metadata.background}`}} onClick={()=>{Router.push(metadata.media)}}></Image>
                        </div>
                        <div className='card-info z-index center'>
                            <div>
                                <h4>Name: {metadata.name}</h4>
                                <span><p>Description: {metadata.description} </p></span>
                                <span><p>External link:  <a className="link" href={metadata.path}>{metadata.path}</a></p></span>
                                <span><h4>Price</h4> 1000 THB </span>
                                
                            </div>
                            <button type="button" className="field-btn btn-primary">Buy now</button>
                        </div>
                    </div>
                )  
            // break;
            // case "video":
            //     return(
            //         <div className="card">    
            //             <div className='card-content' >
            //                 <video width="320"  controls src={metadata.media}/>
            //             </div>
            //             <div className='card-info w-100' style={{opacity: 1}}>
            //                 <h4>Name: {metadata.name}</h4>
            //                 <span><p>Description: {metadata.description} </p></span>
            //                 <span><p>External link:  <a className="link" href={metadata.media}>{metadata.media}</a></p></span>
            //                 <span><h4>Price</h4> 1000 THB </span>
            //                 <button type="button" className="field-btn btn-primary">Buy now</button>
            //             </div>
            //         </div>
            //     )
            // break;
            // case "audio":
            //     return(
            //         <div className="card">    
            //             <div className='card-content' >
            //                 <div style={{width: "320px", height: "240px",backgroundImage: `${metadata.background}`, backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
            //                 </div>
            //                 <audio controls src={metadata.media}/>
            //             </div>
            //             <div className='card-info w-100' style={{opacity: 1}}>
            //                 <h4>Name: {metadata.name}</h4>
            //                 <span><p>Description: {metadata.description} </p></span>
            //                 <span><p>External link:  <a className="link" href={metadata.media}>{metadata.media}</a></p></span>
            //                 <span><h4>Price</h4> 1000 THB </span>
            //                 <button type="button" className="field-btn btn-primary">Buy now</button>
            //             </div>
            //         </div>
            //     )
            // break;
        // }
    }
    useEffect(()=>{
        mediatype();
    })
    return(
        <div className="card-container">
            {mediatype()}
        </div>
    )
}

export default MediaCard;