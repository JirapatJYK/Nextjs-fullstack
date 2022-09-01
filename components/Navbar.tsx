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
    function collapse(){
        var x = document.getElementById("myTopnav");
        if(x){
            if (x.className === "") {
                x.className += " responsive";
            } else {
                x.className = "";
            }
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
        <nav id='myTopnav'>
                <ul>
                    
                    <li className="nav-item">
                        <Link href="/">
                            <b>LOGO_NAME</b>
                        </Link>
                    </li>

                </ul>

                <ul>
                    <li className="nav-item">
                        <div className='search-box'>
                            <input type="search"  placeholder="search..."/>
                            <button type="button">seach</button>
                        </div>
                    </li>
                </ul>
                
                
                <ul>
                    <li className="nav-item">
                        <Link href="/explore">
                            Explore
                        </Link>
                    </li>    
                    <li className="nav-item">
                        <Link href="/create">
                            Create
                        </Link>
                    </li >
                    <li className="nav-item dropdown dropdown-hover">
                        <a onClick={(e)=> account()}>{userName}</a>
                        <ul className="dropdown-menu dropdown-left">
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
            
            <i className='icon' onClick={()=>{collapse()}}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </i>
        </nav>
    )
}
export default Navbar;