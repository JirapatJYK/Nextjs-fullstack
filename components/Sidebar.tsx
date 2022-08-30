import Link from "next/link"
import { Children } from "react";
interface group {
    groupName:  String;
    list: any[];
}
export function Sidebar({children}:{children: any}) {
    return (
            <aside >
                {/* {sideMenu.map((group: group, index) => {
                    return(
                        <ul>
                            <h1>{group.groupName}</h1>
                            {group.list.map((menu) => {
                                return(
                                    <li >
                                        <Link href={menu['url']}>
                                            {menu.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    )
                    
                })} */}
                {children.map((child : HTMLElement) =>{
                    return(
                        <>
                        {child}
                        <hr/>
                        </>
                    )
                })}
                
             
            </aside>
    )
}

export function SidebarFooter({children}:{children: any}) {
    return (
        <div style={{bottom: '0px'}}>
            {children}
        </div>
    )
}
export function SidebarHeader({children}:{children: any}) {
    return (
        <div style={{}}>{children}</div>
    )
}
export function SidebarContent({children}:{children: any}) {
    return (
        <>
            {children}
        </>
        
    )
}