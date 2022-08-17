import Pagination from "./Pagination"

const DataTable = ({tableHead, tableBody}:{tableHead: any[], tableBody: any[]}) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {tableHead.map(field => {
                            return (
                                <th key={field['id']}>
                                    {field}
                                </th>
                            )
                        })}
                    </tr>
                    
                </thead>
                <tbody>
                    {tableBody.map(data =>{
                        return (
                            <tr key={data['id']}>
                                {tableHead.map(field =>{
                                    return(
                                        <td key={field['id']}>{data[field]}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Pagination />
        </div>
        
    )
}

export default DataTable;