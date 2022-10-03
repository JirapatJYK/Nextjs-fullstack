import { getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import Link from "next/link";
import Router from 'next/router';
import { useEffect, useState } from "react";
import SearchBox from './SearchBox';


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
    const[blnDarkMode, setBlndarkMode] = useState(false);

    function signin(){
        if(userName == "Signin"){
            Router.push('/user/signin');
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
        if(document.body.getAttribute('theme') == 'dark'){
            setBlndarkMode(true);
        }else setBlndarkMode(false);

    },[]);
    return(
        <>
            <nav id='myTopnav'>
                <ul>
                    
                    <li className="nav-item">
                        <Link href="/">
                            <Image src="/favicon.ico" width="50" height="50" />
                        </Link>
                    </li>

                </ul>

                <ul>
                    <li className="nav-item">
                        <SearchBox/>
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
                        {
                            userName == "Signin"? <a onClick={(e)=>{signin()}} style={{border: '2px solid var(--primary-color)', padding: '2px', color: 'var(--primary-color)'}}><a href="#" className="fa fa-1x fa-user-circle"></a>{userName}</a>:
                            <Image src="/favicon.ico" width="50" height="50" />
                        }
                        {
                            userName == "Signin"? '':
                            <ul className="dropdown-menu dropdown-left">
                                <li>
                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                            <div style={{width: '100px', height: '100px'}}>
                                                <a href="#" className="fa fa-4x fa-user-circle"></a>
                                            </div>
                                            <div style={{marginRight: '10px'}}>
                                                <a href="#" className=""> Name</a><br/>
                                                <a className='link'>Manage Account</a>
                                            </div>
                                        </div>
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
                                        <input id="theme-switch" type="checkbox" onChange={()=>{ SetTheme();}} checked={blnDarkMode}></input>
                                        <label className="slider round" htmlFor="theme-switch"></label>
                                    </div>
                                    Dark Mode
                                </li>
                                <li>
                                    <button>Sign out</button>
                                </li>
                            </ul>
                        }
                        
                    </li>
                </ul>
                
                <i className='icon' onClick={()=>{collapse()}}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </i>
            </nav>
            <ul className='social' >
                <a href="mailto:jirapat.ja@mail.wu.ac.th" className="fa fa-2x fa-google"></a>
                <a href="#" className="fa fa-2x fa-facebook"></a>
                <a href="https://www.linkedin.com/in/jirapat-jaiyakwang-1b6202230/" className="fa fa-2x fa-linkedin"></a>
                <a href="#" className="fa fa-2x fa-instagram"></a>
            </ul>
        </>
        
    )
}
export default Navbar;