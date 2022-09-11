import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
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
    
    const[inputUserName, setInputUserName] = useState("Signin");
    const[blnDarkMode, setBlndarkMode] = useState(false);

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
    async function Signin(){
        await setUserName(inputUserName)
        await setCookie("login", userName);
        await console.log(userName)
        await getAccountData(inputUserName)
    }
    function getAccountData(userName: String){
        fetch('/api/accounts/get-account', {
            method: 'POST',
            body: JSON.stringify(userName),
        })
        .then((response) => {
            response.json().then((data) => {
                console.log(data);
                
            });
            // console.log(data);
        }).catch((error) => {
            console.log(error);
        })
    }
    useEffect(()=>{
        if(document.body.getAttribute('theme') == 'dark'){
            setBlndarkMode(true);
        }else setBlndarkMode(false);
        const account = getCookie("login");
        console.log(account);
        if(account == "undefined" || account == null){
            setUserName("Signin")
        }else {
            setUserName(account.toString());
            getAccountData(userName)
        }
    }, []);
    return(
        <nav id='myTopnav'>
                <ul>
                    
                    <li className="nav-item">
                        <Link href="/">
                            <Image src="/favicon.ico" width="70" height="70" />
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
                        <a>{userName}</a>
                        <ul className="dropdown-menu dropdown-left">
                            <li>
                                {userName == "Signin"? 
                                    <div>
                                        <h1>Sign in</h1>
                                        <input type="text" placeholder="Enter your username" onChange={(e)=>setInputUserName(e.target.value)}></input>
                                        <input type="text" ></input>
                                        <button onClick={(e)=> Signin()}>Sign in</button>
                                    </div>
                                    :
                                    <div style={{textAlign: "center"}}>
                                        <Image src="/favicon.ico" width="100" height="100" onClick={e=>{account()}}/>
                                        <br/>
                                        <Link href="#profile">
                                            <a>{userName}</a>
                                        </Link>
                                    </div>
                                } 
                                
                                
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
                                <a onClick={()=>{deleteCookie("login"); setUserName("Signin")}}>
                                    Log Out
                                </a>
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