import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import Link from "next/link";
import Router from 'next/router';
import { useEffect, useState } from "react";
import SearchBox from './SearchBox';
import TextInput from './TextInput';
import Loader from './Loader';

const Navbar =()=>{
    const[listUserInfo, setListUserInfo] = useState({
        _id: " ",
        status: "",
        username: "",
        email: " ",
        exp: 0,
        avatar: "/favicon.ico",
        frame: " ",
        banner: " ",
    });
    const[walletInfo, setWalletInfo] = useState({
        wallet_address: "",
        credits: 0,
        gems: 0
    });
    
    const[blnLoading, setBlnLoading] = useState(false)
    const[blnDropdown, setBlnDropdown] = useState(false)
    const  popupCallback =(childData: boolean) =>{
        // setBlnPopup(childData)
        console.log(childData)

    }
    
    async function getUserInfo(){
        const myToken = getCookie("myToken")?.toString()
        const response = await fetch('/api/accounts/get-account-one', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': myToken!== undefined ? myToken : ''
            },  
        })
        const data = await response.json()
        console.log(data.data.wallet);
        await setListUserInfo(data.data.baseInfo);
        await setWalletInfo(data.data.wallet);
        await console.log(walletInfo);
    }
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
    function socialCollapse(){
        console.log("collapse")
        const x = document.getElementById("mySocial");
        if(x){
            if (x.className === "social") {
                x.className += " show-icon";
            } else {
                x.className = "social";
            }
        }
    }

    // async function login() {
    //     setBlnLoading(true)
    //     console.log("")
    //     const params = await {
    //         email: strEmail,
    //         password: strPassword
    //     }
    //     const response = await fetch('/api/accounts/signin', {
    //         method: 'POST',
    //         body: JSON.stringify({params}),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'x-access-token': "listUserInfo.token"
    //         },  
    //     })
    //     const responseData = await response.json()
    //     setBlnLoading(false)
    //     console.log(responseData)
    //     if (responseData.status == 'success') {
    //         setBlnPopup(true)
    //         setListPopupData(listPopupData =>({...listPopupData, title: responseData.status}))
    //         const timeout = setTimeout(() => {
    //             setBlnPopup(false)
    //         }, 1000);
    //         setCookie("myToken", responseData.token, {maxAge: 300});
    //         setListUserInfo(responseData.userInfo)
    //         console.log(getCookie("myToken"))
    //     }else {
    //         setBlnPopup(true)
    //         setListPopupData(listPopupData =>({...listPopupData, title: responseData.status}))
    //     }
    //     await console.log(listUserInfo);
    // }

    useEffect(()=>{
        // getUserInfo()
        console.log(hasCookie("myToken"))
        if(hasCookie("myToken")){
            getUserInfo();
        }
    },[]);
    return(
        <>
            
            <Loader isLoading={blnLoading} />
            <nav id='myTopnav'>
                <ul>
                    <li className="nav-item">
                        <Link href="/">
                        <div className="logo-text d-flex">
                           <Image src={'/favicon.ico'} width={'50px'} height={'50px'} />INSTEADIZE
                        </div>
                        </Link>
                    </li>
                </ul>

                {/* <ul>
                    <li className="nav-item">
                        <SearchBox listSearcher={[]} onSearch/>
                    </li>
                    
                </ul> */}
                
                
                <ul>
                    <li className="nav-item ">
                        <Link href="/explore">
                            <a>Explore</a>
                        </Link>
                    </li>    
                    <li className="nav-item">
                        <Link href="/create">
                            <a>Create</a>
                        </Link>
                    </li >
                    <li className="nav-item">
                        {
                            hasCookie("myToken") == false? 
                            <>
                                <Link href={'/user/authentication'}>
                                <div style={{color: 'var(--primary-color)'}}>
                                    <a href="#" className="fa fa-1x fa-user-circle"></a>
                                        <a>Signin </a>
                                </div>
                                </Link>
                            </>:
                            <>
                                <Image src={listUserInfo.avatar} width="50" height="50" onClick={()=>{setBlnDropdown(!blnDropdown)}}/>
                                <ul id='nav-dropdown' style={{display : blnDropdown?'':'none'}} className="dropdown-menu dropdown-left">
                                    <li>
                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                            <div>
                                               
                                                <Image src={listUserInfo.avatar} width="100" height="100" />
                                            </div>
                                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '10px'}}>
                                                <a className="dropdown-header">{listUserInfo.username}</a>
                                                <label htmlFor='exp'>exp: {listUserInfo.exp}</label>
                                                <progress id="exp-progress" value={listUserInfo.exp} max="100"></progress>
                                            </div>
                                            
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column', fontSize: '14px'}}>
                                            <a>UID : {listUserInfo._id}</a>
                                            <Link href={'/user/'+ listUserInfo._id}>
                                                <a className='link'>Manage Account </a>
                                            </Link>
                                        </div>
                                        
                                    </li>
                                    <li>
                                        
                                        <Link href="#wallet">
                                            <a>Wallet : {walletInfo.wallet_address}</a>
                                        </Link>
                                        <li>credits : {walletInfo.credits}</li>
                                        <li>gems : {walletInfo.gems}</li>
                                    </li>
                                    <li>
                                        <Link href="#favorite">
                                            Favoites
                                            </Link>
                                    </li>
                                    <li>
                                        <button className='btn-danger' onClick={(e)=>{deleteCookie("myToken"); Router.push('/')}}>Sign out</button>
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
            <ul className='social' id='mySocial'>
                
                {/* <a className="fa fa-2x fa-facebook"></a> */}
                <Link href="https://discord.gg/wyjvhxD2">
                    <a className='fa fa-discord'><Image src='/icon/discord.svg' width={30} height={30} /></a>
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
                <a className="fa fa-2x fa-send" onClick={()=>{socialCollapse()}}></a>
            </ul>
            {blnDropdown?<div className="bg-click" onClick={()=>{setBlnDropdown(false)}}></div>: ''}
            
        </>
        
    )
}
export default Navbar;