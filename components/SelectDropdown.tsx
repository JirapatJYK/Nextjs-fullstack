import { useState } from "react"

export default function SelectDropdown({header, list}:{header: String, list: any[]}){
    const [selected, setSelect] = useState(0)
    return (
        <div className="dropdown">
            <label className="dropdown-header">
                {header}
            </label>
            <select>
                {list.map(item=>{
                    return (
                        <option className="dropdown-item" key={item.key} onClick={()=>{setSelect(item.id)}}>
                            {item.value}
                        </option>
                    )})
                }
            </select>
            
        </div>
    )
}