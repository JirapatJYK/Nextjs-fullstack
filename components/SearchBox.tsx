import { useState } from "react"
import Popup from "./Popup";
// const listSearcher: [
//     {
//         field: "name",
//         value: "tew"
//     }
// ]
var Props = {
    animate: "string",
    isShow: true,
    title: "string",
    content: [{
        type: "text",
        itemProps: {label: "string"}
    }],
    button: [{
        label: "string",
        isDisabled: false,
        style: "primary",
    }],
}
export default function SearchBox({onSearch}:{onSearch(keyword: string): any}){
    const[keyword, setKeyword] = useState('')
    const[listAssistWord, setListAssistWord] = useState([])

    function search(){
        // if(keyword!='')
        // alert("search : " + keyword)
        // setCookie("searchKeyword")
        // setCookie("searchCount")
        Popup(Props);
        onSearch(keyword);

    }
    function searchAsistance(keyword: string){
        setKeyword(keyword)
        
        // getCookie("searchKeyword")
    }
    return (
        <div style={{height: 32, border: "2px solid blue", borderRadius: 8, overflow: "hidden", display: 'flex', padding: "0 16px"}}>
            <input style={{opacity: 1, height: "100%", width: "100%", backgroundColor: "#00000000", color: "white", outline: "none", border:"none"}} placeholder="search..." onChange={e=>searchAsistance(e.target.value)}/>
            <button style={{height: 32}} onClick={(e)=>{search()}}><a className="fa fa-search" style={{color: "red"}}></a></button>
            {
                listAssistWord.length!=0? 
                <div className="dropdown">
                    
                </div>: ''
            }
        </div>
    )
}