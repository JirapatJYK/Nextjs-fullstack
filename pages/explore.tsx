import { NextPage } from "next";
import Image from 'next/image'
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import MediaCard from "../components/MediaCard";
import metadata from "../data//metadata/metadata.json";
import metadata1 from "../data//metadata/metadata1.json";
import data from "../data//metadata/database.json";


import Navbar from "../components/Navbar";

const Explore: NextPage =()=>{
  const [isLoading, setIsloading] = useState(true);
    
  function collapse(id: string){
    const dropdown = document.getElementById(id);
    if(dropdown){
        if(dropdown.style.display == "none"){
            dropdown.style.display = "block";
        }else
        dropdown.style.display = "none";
    }
    // dropdown.styles
    console.log(id);
  }
  useEffect(()=> {
    console.log('Home Component')
    const timeout = setTimeout(()=> {
      setIsloading(false);
    },2500)
  })
    return(
        <>
            <Loader  isLoading = {isLoading} />
            <Navbar/>
            <div className="grid-container">
                <aside>
                    <ul>
                        <li className="dropdown" >
                            <span className="btn" onClick={() => collapse("status")}>
                                <h1 >Status</h1> 
                            </span>
                            <ul id="status" className="dropdown-menu">
                                <li></li>
                            </ul>
                        </li>
                        <li className="dropdown" >
                            <span className="btn" onClick={() => collapse("price")}>
                                <h1>Price</h1>
                            </span>
                            <ul id="price" className="dropdown-menu">
                                <li>
                                    <span><input className="inputprice" type="number" placeholder="min"/> - <input className="inputprice" type="number" placeholder="max"/></span>
                                    <div><button className="field-btn">Apply</button></div>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <span className="btn" onClick={() => collapse("quantity")}>
                                <h1>Quantity</h1>
                            </span>
                            <ul id="quantity" className="dropdown-menu">
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li>5</li>
                                <li>6</li>
                                <li></li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <span className="btn" onClick={() => collapse("collections")}>
                                <h1>Collections</h1>
                            </span>
                            <ul id="collections" className="dropdown-menu">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>

                            </ul>
                        </li>
                        <li className="dropdown">
                            <h1>Category</h1>
                            <ul className="dropdown-menu">
                                <li>Images</li>
                                <li>Audio</li>
                                <li>Videos</li>
                                <li>3D</li>
                            </ul>
                        </li>
                    </ul>
                </aside>
                <div className="main-content ">
                    <div className="scroll-view">

                        <MediaCard metadata={metadata} />
                        <MediaCard metadata={metadata1} />
                        {data.map(data =>{
                            return( 
                                <div key={data.name} >
                                    <MediaCard metadata={data}/>
                                </div>
                            )
                        } )}
                        
                    </div>

                        
                </div>
            </div>

        </>
    )
}

export default Explore;