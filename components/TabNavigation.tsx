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
                return <button className={selectedTab==index?"tab-button active-btn":'tab-button'} onClick={e=>emitData(index)}>{tab["strName"]}</button>
            })}
        </div>
    )
}