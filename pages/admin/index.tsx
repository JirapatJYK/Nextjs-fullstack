import Router from "next/router";
import { useEffect, useState } from "react"
import Chart from "../../components/Chart";
import DataTable from "../../components/DataTable";
import Navbar from "../../components/Navbar";
import Popup from "../../components/Popup";
import TabNavigation from "../../components/TabNavigation";

export default function AdminHome() {
    const[ chartProps, setChartProps] = useState({
        title: "Chart title",
        type: 'bar',
        data: {
            labels: [
                "1","2","1","2"
            ],
            datasets: [
                {
                    label: "string",
                    data: [
                        1,2,3
                    ],
                    color: "red",
                }
            ]
        },
        option: {
            title: "Chart title"
        }
    })
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
        button: [
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
    const [listTabs, setListTabs] = useState(
        [
            {
                strName: "Dashboard",
            },
            {
                strName: "Items"
            },
            {
                strName: "Players"
            },
            {
                strName: "Transactions"
            }
        ]
    )
    const [intCurrentTab, setIntCurrentTab] = useState(0);
    const checkUserrue = () => {
        return true;
    }
    useEffect(() => {
        if (!checkUserrue()) {
            Router.push('./authentication')
        }
    }, [])
    function selectedTab(childData: any) {
        // alert("Selected tab: " + childData);
        setIntCurrentTab(childData);
    }
    return (
        <div>
            {/* <Navbar /> */}
            {/* <Popup blnShow={blnPopup} data={popupData} parentCallback /> */}
            <div className="container">
                <div className="main">
                    <TabNavigation tabsName={listTabs} onSelectedTab={selectedTab} />
                    <div className="tab-container">
                        {intCurrentTab == 0 ?
                            <div style={{ color: 'red' }}>
                                <h1>PLAYERS ONLINE</h1>
                                <Chart {...chartProps}/>
                            </div>
                            : intCurrentTab == 1 ?
                                <h1>Items Management</h1>

                                : intCurrentTab == 2 ?
                                <h1>Players Management</h1>
                                :   <h1>Transaction view</h1>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}