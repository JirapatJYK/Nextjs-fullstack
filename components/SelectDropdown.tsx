import { useState } from "react"
import { json } from "stream/consumers"

export default function SelectDropdown({header, list}:{header: String, list: any[]}){
    const [selected, setSelect] = useState(0)
    const [selectList, setSelectList] = useState(
        [
            {
                id: 0,
                value: "selected"
            },
        ]
    )

    function addList(){
        setSelectList(list)
        const e = document.getElementsByTagName("select")[0]
        e.style.display = "block"
    }
    return (
        <>
        {JSON.stringify(selectList)}
        <div className="select-dropdown">
            <label className="select-header"  onClick={()=>{addList()}}>
                {header}
            </label>
            <select>
                {
                    selectList.map(item=>{
                        return (
                            <option className="select-item" key={item.id} onClick={()=>{setSelect(item.id)}}>
                                {item.value}
                            </option>
                        )
                    })
                }
            </select>
            
        </div>
        </>  
    )
}