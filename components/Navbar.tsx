import { getCookie, setCookie } from 'cookies-next';
import Link from "next/link";
import Router from 'next/router';
import { useEffect, useState } from "react";


const Navbar =()=>{
    function SetTheme() {
        const themeSwitch :any = document.getElementById('theme-switch');
        if(themeSwitch.checked){ 
            document.body.setAttribute('theme', "dark");
            setCookie("theme", "dark")
        }else { 
            document.body.setAttribute('theme', "light");
            setCookie("theme", "light")
        }
    }
    const[userName, setUserName] = useState("Signin");

    function account(){
        if(userName == "Signin"){
            Router.push('/user/signup');
        }
    }

    useEffect(()=>{
        if(!document.body.getAttribute('theme')){
            document.body.setAttribute('theme', "light");
        }
        const theme = getCookie("theme",{});
        document.body.setAttribute('theme', String(theme));
        const themeSwitch :any = document.getElementById('theme-switch');
        if(document.body.getAttribute('theme')=="dark")
        themeSwitch.checked = true;

    });
    return(
        <nav>
            <ul>
                
                <li>
                    <Link href="/">
                        <b>LOGO_NAME</b>
                    </Link>
                </li>

            </ul>

            <ul>
                <div className='search-box'>
                    <input type="search"  placeholder="search..."/>
                    <button type="button">seach</button>
                </div>
            </ul>
            
            
            <ul>
                <li>
                    <Link href="/explore">
                        Explore
                    </Link>
                </li>    
                <li>
                    <Link href="/create">
                        Create
                    </Link>
                </li>
                <li className="dropdown dropdown-hover">
                    <a onClick={(e)=> account()}>{userName}</a>
                    <ul className="dropdown-menu">
                        <li>
                            <Link href="#profile">
                                Profile   
                            </Link>
                        </li>
                        <li>
                            <Link href="#wallet">
                                Wallet
                            </Link>
                        </li>
                        <li>
                            <Link href="#favorite">
                                Favoites
                                </Link>
                        </li>
                        <li>
                            <div className="switch">
                                <input id="theme-switch" type="checkbox" onChange={()=>{ SetTheme();}}></input>
                                <label className="slider round" htmlFor="theme-switch"></label>
                            </div>
                            Night Mode
                        </li>
                    </ul>
                    
                </li>
            </ul>
        </nav>
    )
}
export default Navbar;