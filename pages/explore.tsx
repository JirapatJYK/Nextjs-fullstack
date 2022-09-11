import { NextPage } from "next";
import Image from 'next/image'
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import MediaCard from "../components/MediaCard";
import metadata from "../data//metadata/metadata.json";
import metadata1 from "../data//metadata/metadata1.json";
import data from "../data//metadata/database.json";


import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
const sideMenu = [
    {   
        groupName: "Group1", 
        list:[
            {
                name: "menu0",
                url: "#menu0",
                type: "dropdown",
               
            },
            {
                name: "menu1",
                url: "#menu1",
                type: "btn",
            }
        ],
    },
    {    
        groupName: "Group2", 
        list:[
            {
                name: "menu0",
                url: "#menu0",
                type: "btn",
            },
            {
                name: "menu1",
                url: "#menu1",
                type: "btn",
            }
        ],
    }
]
const Explore: NextPage =()=>{
    const [isLoading, setIsloading] = useState(true);
    const [uploadData, setUploadData] = useState([]);
  function collapse(id: string){
    const dropdown = document.getElementById(id) ;
    if(dropdown){
        // const Style = dropdown.style.display;
        if(dropdown.style.display == "block"){
            dropdown.style.display = "none";
        }else
        dropdown.style.display = "block";
    }
    // dropdown.styles
    console.log(id);
  }
    function getFilesAll(){
        fetch('/api/upload/get-upload-files-all', {
            method: 'GET',
        })
        .then((response) => {
            response.json().then((data) => {
                console.log(data);
                setUploadData(data);
            });
            // console.log(data);
        }).catch((error) => {
            console.log(uploadData);
        })
    }
  useEffect(()=> {
    console.log('Home Component')
    const timeout = setTimeout(()=> {
      setIsloading(false);
    },2500)
    getFilesAll()
  }, [])
    return(
        <>
            <Loader  isLoading = {isLoading} />
            <Navbar/>
            <div className="container flex" style={{height: '100vh'}}>
                <aside >
                    <h1 style={{backgroundColor: 'blue'}}>Sidebar</h1>
                    <ul style={{maxHeight: '90vh'}} className="scroll-view">
                        <li className="dropdown" >
                            <span className="btn" onClick={() => collapse("status")}>
                                <h2 >Status</h2> 
                            </span>
                            <ul id="status" className="dropdown-menu">
                                <li></li>
                            </ul>
                        </li>
                        <li className="dropdown" >
                            <span className="btn" onClick={() => collapse("price")}>
                                <h2>Price</h2>
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
                                <h2>Quantity</h2>
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
                                <h2>Collections</h2>
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
                            <h2>Category</h2>
                            <ul className="dropdown-menu">
                                <li>Images</li>
                                <li>Audio</li>
                                <li>Videos</li>
                                <li>3D</li>
                            </ul>
                        </li>
                    </ul>
                </aside>
                {/* <Sidebar  >
                    <SidebarHeader>
                        <h1>Categories</h1>
                    </SidebarHeader>
                    <SidebarContent>
                        <ul>
                            <li className="dropdown" >
                                <span className="btn" onClick={() => collapse("status")}>
                                    <h2 >Status</h2> 
                                </span>
                                <ul id="status" className="dropdown-menu">
                                    <li></li>
                                </ul>
                            </li>
                            <li className="dropdown" >
                                <span className="btn" onClick={() => collapse("price")}>
                                    <h2>Price</h2>
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
                                    <h2>Quantity</h2>
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
                                    <h2>Collections</h2>
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
                                <span className="btn" onClick={() => collapse("category")}>
                                    <h2>Category</h2>
                                </span>
                                <ul id="category" className="dropdown-menu">
                                    <li>Images</li>
                                    <li>Audio</li>
                                    <li>Videos</li>
                                    <li>3D</li>
                                </ul>
                            </li>
                        </ul>
                    </SidebarContent>
                    <SidebarFooter>
                        sdsdsdd
                    </SidebarFooter>
                </Sidebar> */}
                <div className="main-content " style={{border: "2px solid black"}}>
                    <div className="explore scroll-view">

                        {/* <MediaCard metadata={metadata} />
                        <MediaCard metadata={metadata1} /> */}
                        {uploadData.map(data =>{
                            return( 
                                <div key={data.name} > 
                                    <MediaCard metadata={data}/>
                                </div>
                            )
                        } )}
                        
                    </div>
                    <Pagination />
                </div>
            </div>

        </>
    )
}

export default Explore;