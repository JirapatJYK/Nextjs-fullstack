import Router from "next/router";
import { useEffect, useState } from "react"
import DataTable from "../../components/DataTable";
import Navbar from "../../components/Navbar";
import Popup from "../../components/Popup";

export default function AccountData(){
    const [popupData, setPopupData] = useState({
        title: "",
        content: [
            {}
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
            {}
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
    const [blnPopup, setBlnPopup] = useState(false);

    const checkUserrue = () => {
        return true;
    }
    useEffect(()=> {
        if(checkUserrue()){
            Router.push('./login')
        }
    },[])
    return(
        <div>
            <Navbar/>
            {/* <Popup blnShow={blnPopup} data={popupData} parentCallback/> */}
            <div className="container">
                
            </div>
        </div>
    )
}