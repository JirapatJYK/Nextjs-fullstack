import { useState } from "react"
// const listSearcher: [
//     {
//         field: "name",
//         value: "tew"
//     }
// ]
export default function SearchBox({listSearcher, onSearch}:{listSearcher: any, onSearch: any}){
    const[keyword, setKeyword] = useState('')
    const[listAssistWord, setListAssistWord] = useState([])

    function search(){
        if(keyword!='')
        alert("search : " + keyword)
        // setCookie("searchKeyword")
        // setCookie("searchCount")

    }
    function searchAsistance(keyword: string){
        setKeyword(keyword)
        // getCookie("searchKeyword")
    }
    return (
        <div className="search-box">
            <input type="search" placeholder="search..." onChange={e=>searchAsistance(e.target.value)}/>
            <button onClick={(e)=>{search()}}><a className="fa fa-search" style={{color: "red"}}></a></button>
            {
                listAssistWord.length!=0? 
                <div className="dropdown">
                    
                </div>: ''
            }
        </div>
    )
}