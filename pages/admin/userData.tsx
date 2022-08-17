import { useEffect, useState } from "react"
import DataTable from "../../components/DataTable";
import Navbar from "../../components/Navbar";

export default function AccountData(){
    const [accountData, setAccountData] = useState([]);
    const [tableField, setTableField] = useState(["_id", "name", "email", "password"]);

    const getUserData = async() => {
        // try {
        //     const response = await fetch('/api/account/get-accounts-all');
        //     const data = await response.json()
        //     await setAccountData(data);
        //     await console.log("response");
        //     await console.log(response);
        //     await console.log("data");
        //     await console.log(data);

        // } catch (error) {
        //     console.log("error");
        //     console.log(error);
        //     console.log("error");

        // }
        await fetch('/api/account/get-accounts-all')
        .then(async (response) => {
            const data = await response.json();
            await setAccountData(data);
            await console.log("response");
            await console.log(response);
            await console.log("data");
            await console.log(data);
        }).catch((error) => {
            console.log("error");
            console.error(error);
            console.log("error");
        })
        
        await console.log(accountData);
        
    }
    useEffect(()=> {
        getUserData()
    },[])
    return(
        <div>
            <Navbar/>
            <div className="container">
                <DataTable  tableHead={tableField} tableBody={accountData} />
            </div>
        </div>
    )
}