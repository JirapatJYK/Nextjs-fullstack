import { getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import Link from "next/link";
import Router from 'next/router';
import { useEffect, useState } from "react";
import InputText from './InputText';
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

    function showProfile(){
        const e = document.getElementById("nav-dropdown");
        if(e){
            console.log(e.style.display);
            if(e.style.display == "none"){
                e.style.display = "block"
            }else e.style.display = "none"
        }
    }
    function collapse(){
        const x = document.getElementById("myTopnav");
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
                    <li className="nav-item dropdown">
                        {
                            userName == "Signin"? 
                            <>
                                <a onClick={()=>{showProfile()}} style={{border: '2px solid var(--primary-color)', padding: '2px', color: 'var(--primary-color)'}}>
                                    <a href="#" className="fa fa-1x fa-user-circle"></a>
                                        {userName}
                                </a>
                                <ul id='nav-dropdown' style={{display : 'none'}} className="dropdown-menu dropdown-left">
                                    <div className='nav-login'>
                                        <a className="header m-auto">Login</a>
                                        <div>
                                            {/* <label>Username</label> */}
                                            <input type="text" placeholder="Enter your username..."/>
                                        </div>
                                        <div>
                                            {/* <label>Password</label> */}
                                            <input type="password" placeholder="Enter your password..."/>
                                        </div>
                                        <a className='link'>forgot password?</a>
                                        <button className="btn btn-primary">Login</button>
                                        <div>
                                            Not a member? 
                                            <Link href={'/user/signup'}>
                                                <a className='link'>  Signup</a>
                                            </Link>
                                        </div>
                                    </div>
                                </ul>
                            </>:
                            <>
                                <Image src="/favicon.ico" width="50" height="50" />
                                <ul id='nav-dropdown' className="dropdown-menu dropdown-left">
                                    <li>
                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                            <div>
                                                {}
                                                <a href="#" className="fa fa-4x fa-user-circle"></a>
                                            </div>
                                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '10px'}}>
                                                <a className="dropdown-header">Name </a>
                                                <Link href={'/user/'+ 'accountID'}>
                                                    <a className='link'>Manage Account</a>
                                                </Link>
                                                
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
                                        <button className='btn-danger'>Sign out</button>
                                    </li>
                                </ul>
                            </>
                            
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
                {/* <Link href="mailto:jirapat.ja@mail.wu.ac.th">
                    <a className="fa fa-2x fa-google"></a>
                </Link> */}
                <Link href="https://discord.gg/wyjvhxD2">
                    <a className="fa fa-2x fa-discord"></a>
                </Link>
                <Link href="#">
                    <a className="fa fa-2x fa-facebook"></a>
                </Link>
                <Link href="https://www.linkedin.com/in/jirapat-jaiyakwang-1b6202230/">
                    <a className="fa fa-2x fa-linkedin"></a>
                </Link>
                <Link href="#">
                    <a className="fa fa-2x fa-instagram"></a>
                </Link>
                
                
            </ul>
        </>
        
    )
}
export default Navbar;