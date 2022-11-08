import { useState } from "react";

export default function TabNavigation({tabsName, onSelectedTab}:{tabsName: any[], onSelectedTab: any}){
    function emitData(select: any){
        setSelectedTab(select);
        onSelectedTab(select)
    }
    const [selectedTab, setSelectedTab] = useState(0);
    return (
        <div className="tab">
            {tabsName.map((tab, index)=> {
                return <button style={selectedTab==index?{borderBottom: '4px solid var(--primary-color)'}:{}} onClick={e=>emitData(index)}>{tab["strName"]}</button>
            })}
        </div>
    )
}