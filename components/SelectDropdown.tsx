import { useState } from "react"
type dropdownList = {
    header: string,
    onSelected?: any,
    list: {
        name : string,
        id : string,
        
    }[]
}
export default function SelectDropdown(props: dropdownList){
    const [selected, setSelect] = useState("")
    function Selecte(selectedId: string){
        console.log(selectedId);
        setSelect(selectedId);
        props.onSelected(selectedId);
    }
    return (
        <>
        {JSON.stringify(props.list)}
        <div className="select-dropdown">
            <label className="select-header" >
                {props.header}
            </label>
            <select defaultValue='defaultValue' onChange={(e)=>{Selecte(props.list[e.target.selectedIndex -1].id)}}>
                <option disabled value='defaultValue' > -- select an {props.header} -- </option>
                {
                    props.list.map(item=>{
                        return (
                            <option className="select-item" key={item.id} >
                                {item.name}
                            </option>
                        )
                    })
                }
            </select>
            
        </div>
        </>  
    )
}