import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import TextInput from "./TextInput";
import Loader from "./Loader";

const Navbar = () => {
  const [listUserInfo, setListUserInfo] = useState({
    _id: " ",
    status: "",
    username: "",
    email: " ",
    exp: 0,
    avatar: "/favicon.ico",
    frame: " ",
    banner: " ",
  });
  const [walletInfo, setWalletInfo] = useState({
    wallet_address: "",
    credits: 0,
    gems: 0,
  });

  const [blnLoading, setBlnLoading] = useState(false);
  const [blnDropdown, setBlnDropdown] = useState(false);
  const popupCallback = (childData: boolean) => {
    // setBlnPopup(childData)
    console.log(childData);
  };

  async function getUserInfo() {
    const myToken = getCookie("myToken")?.toString();
    console.log(myToken);
    const response = await fetch("/api/accounts/get-account-one", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: myToken !== undefined ? myToken : "",
      },
    });
    const data = await response.json();
    console.log(data.data.wallet);
    await setListUserInfo(data.data.baseInfo);
    await setWalletInfo(data.data.wallet);
    await console.log(walletInfo);
  }
  function collapse() {
    console.log("collapse");
    const x = document.getElementById("myTopnav");
    if (x) {
      if (x.className === "") {
        x.className += " responsive";
      } else {
        x.className = "";
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
  function onSearch(keywords: string){
    console.log("Search : "+keywords);
  }
  useEffect(() => {
    // getUserInfo()
    console.log(hasCookie("myToken"));
    if (hasCookie("myToken")) {
      getUserInfo();
    }
  }, []);
  return <>
    <nav style={{height: '48px',position: "sticky", top:0, display: "flex",  justifyContent: "space-between", backgroundColor: "transparent", padding: "0px 32px", zIndex: 5}}>
        <div style={{position: "relative", display: "flex", flexDirection:"row"}}>
            <div style={{padding: '12px', margin: "", background: "white", }}>
                <img src='/vercel.svg' style={{height:"24px"}}/>
            </div>
            <button>HOME</button>
            
            <button>HOME</button>
            <button>HOME</button>
            <button>HOME</button>
        </div>
        <div style={{ width: "100%",margin: "8px 32px"}}>
            {/* <div style={{top: "50%", transform: "translate(0,50%)"}}> */}
            <SearchBox onSearch={(strKeyword) =>{onSearch(strKeyword)}}/>
        {/* </div> */}
        </div>
        <div style={{position: "relative", display: "flex", flexDirection:"row"}}>

            <button style={{background: "red"}}>cart</button>
            <button style={{padding: 4}} onClick={()=>{alert("ssss")}}>
                <div style={{height: "100%", display: "flex", textAlign: "center", backgroundColor: "rgb(200,200, 255, 0.5", borderRadius: 16, boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", backdropFilter: "blur(5px)", border: "1px solid rgba(255, 255, 255, 0.3)", }}>
                <div style={{position: "relative", margin: "0 8px"}}>
                    <a style={{lineHeight: "48px"}}>Username</a>
                </div>
                <img src="/icons/user.png" style={{ margin: "4px"}}/>
            </div>
            </button>
            
            
            
        </div>
    </nav>
  </>;
};
export default Navbar;
