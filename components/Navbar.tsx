import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import Link from "next/link";
import Router from 'next/router';
import { useEffect, useState } from "react";
import SearchBox from './SearchBox';
import TextInput from './TextInput';
import Popup from './Popup';
import Loader from './Loader';

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
    const[strUsername, setStrUsername] = useState("Signin");
    const[blnDarkMode, setBlndarkMode] = useState(false);
    const[strEmail, setStrEmail] = useState('');
    const[strPassword, setStrPassword] = useState('');
    const[listUserInfo, setListUserInfo] = useState({
        _id: " ",
        status: 0,
        name: "",
        email: " ",
        wallet: {
            address: " ",
            credits: 0,
            gems: 0,
        },
        avatar: " ",
        frame: " ",
        banner: " ",
    });
    const[blnPopup, setBlnPopup] = useState(false)
    const[listPopupData, setListPopupData] = useState({
            title: "",
            content: [
                // {
                //     type: "input",
                //     label: "Username",
                // },
                // {
                //     type: "input",
                //     label: "Password",
                // }
            ],
            button:[
                // { 
                //     text: 'Ok',
                //     blnDisable: false,
                //     style: 'primary',
                // },
                // { 
                //     text: 'Cancel',
                //     blnDisable: false,
                //     style: 'danger',
                // }
                
            ],
            footer: ''
        })
    const[blnLoading, setBlnLoading] = useState(false)
    const[blnDropdown, setBlnDropdown] = useState(false)
    const  popupCallback =(childData: boolean) =>{
        // setBlnPopup(childData)
        console.log(childData)

    }
    
    async function getUserInfo(){
        const myToken = getCookie("myToken")?.toString()
        const response = await fetch('/api/accounts/getAccountOne', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': myToken!== undefined ? myToken : ''
            },  
        })
    }
    // function showProfile(){
    //     console.log("showProfile")
    //     const e = document.getElementById("nav-dropdown");
    //     if(e){
    //         console.log(e.style.display);
    //         if(e.style.display == "none"){
    //             e.style.display = "block"
    //         }else e.style.display = "none"
    //     }
    // }
    function collapse(){
        console.log("collapse")
        const x = document.getElementById("myTopnav");
        if(x){
            if (x.className === "") {
                x.className += " responsive";
            } else {
                x.className = "";
            }
        }
    }

    async function login() {
        setBlnLoading(true)
        console.log("")
        const params = await {
            email: strEmail,
            password: strPassword
        }
        const response = await fetch('/api/accounts/signin', {
            method: 'POST',
            body: JSON.stringify({params}),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': "listUserInfo.token"
            },  
        })
        const responseData = await response.json()
        setBlnLoading(false)
        console.log(responseData)
        if (responseData.status == 'success') {
            setBlnPopup(true)
            setListPopupData(listPopupData =>({...listPopupData, title: responseData.status}))
            const timeout = setTimeout(() => {
                setBlnPopup(false)
            }, 1000);
            setCookie("myToken", responseData.token, {maxAge: 300});
            setListUserInfo(responseData.userInfo)
            console.log(getCookie("myToken"))
        }else {
            setBlnPopup(true)
            setListPopupData(listPopupData =>({...listPopupData, title: responseData.status}))
        }
        await console.log(listUserInfo);
    }

    useEffect(()=>{
        if(document.body.getAttribute('theme') == 'dark'){
            setBlndarkMode(true);
        }else setBlndarkMode(false);
        // getUserInfo()
        console.log(hasCookie("myToken"))
    },[]);
    return(
        <>
            
            <Loader isLoading={blnLoading} />
            <Popup blnShow={blnPopup} data={listPopupData} parentCallback={popupCallback}/>
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
                    <li className="nav-item">
                        {
                            hasCookie("myToken") == false? 
                            <>
                                <a onClick={()=>{setBlnDropdown(!blnDropdown)}} style={{border: '2px solid var(--primary-color)', padding: '2px', color: 'var(--primary-color)'}}>
                                    <a href="#" className="fa fa-1x fa-user-circle"></a>
                                        Signin 
                                </a>
                                <ul id='nav-dropdown' style={{display : blnDropdown?'':'none'}} className="dropdown-menu dropdown-left">
                                    <div className='nav-login'>
                                        <a className="header m-auto">Login</a>
                                        <div>
                                            {/* <label>Username</label> */}
                                            <TextInput lableName="Email" request={true} type="email" onInput={(e: string)=>{setStrEmail(e)}}/>
                                        </div>
                                        <div>
                                            {/* <label>Password</label> */}
                                            <TextInput lableName="Password" request={true} type="password" onInput={(e: string)=>{setStrPassword(e)}}/>
                                            {/* <input type="password" placeholder="Enter your password..." onChange={(e)=>{setStrPassword(e.target.value)}}/> */}
                                        </div>
                                        <a className='link'>forgot password?</a>
                                        <button className="btn btn-primary" onClick={(e)=>{login()}}>Login</button>
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
                                <Image src="/favicon.ico" width="50" height="50" onClick={()=>{setBlnDropdown(true)}}/>
                                <ul id='nav-dropdown' className="dropdown-menu dropdown-left">
                                    <li>
                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                            <div>
                                                {}
                                                <a href="#" className="fa fa-4x fa-user-circle"></a>
                                            </div>
                                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '10px'}}>
                                                <a className="dropdown-header">{listUserInfo.name}</a>
                                                <Link href={'/user/'+ listUserInfo._id}>
                                                    <a className='link'>Manage Account</a>
                                                </Link>
                                                
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        
                                        <Link href="#wallet">
                                            Wallet {/* {listUserInfo.wallet.address} */}
                                        </Link>
                                        <li>credits : {listUserInfo.wallet.credits}</li>
                                        <li>gems : {listUserInfo.wallet.gems}</li>
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
                                        <button className='btn-danger' onClick={(e)=>{deleteCookie("myToken")}}>Sign out</button>
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
            {blnDropdown?<div className="bg-click" onClick={()=>{setBlnDropdown(false)}}></div>: ''}
            
        </>
        
    )
}
export default Navbar;