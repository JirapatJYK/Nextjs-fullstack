import Link from "next/link";
import { useEffect } from "react";

const Navbar =()=>{
    function SetTheme(){
        let theme = document.cookie.split(";").find((item) => item.trim().startsWith("theme="));
        if(theme == "theme=light"){
            
        }
        if(document.documentElement.getAttribute("theme") == "dark"){
            document.documentElement.setAttribute('theme', 'light')
            document.cookie = `theme = light`
        }else{
            document.documentElement.setAttribute('theme', 'dark')
            document.cookie = `theme = dark`
        }
        console.log(document.cookie);
        console.log("theme :"+theme)
        console.log(document.documentElement.getAttribute('theme'))

    }
    useEffect(()=>{

    });
    return(
        <nav>
            <ul>
                
                <Link href="#home">
                    <li>
                        LOG_NAME
                    </li>
                </Link>
                <Link href="#01">
                    <li>home</li>
                </Link>    
                <Link href="#02">    
                    <li>home</li>
                </Link>

            </ul>
            <ul>
                <li><input type="checkbox" onClick={(e)=>{ SetTheme();}}/></li>
                <li>home</li>
                <li>home</li>

            </ul>
        </nav>
    )
}
export default Navbar;