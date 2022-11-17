type Props={
    title: string,
    type: string,
    data: {
        labels: string[],
        datasets: {
            label: string,
            data: number[],
            color: string,
        }[]
    },
    option: {
        title: string
    }
}
export default function Chart(props: Props){
    return (
        <>
            {props.title}
            <div className={props.type}>
                {
                    props.data.datasets.map((data)=>{
                        return data.data.map((value)=>{
                            return <div  className="chart-value">
                                <label htmlFor="progress" style={{color: 'black'}}>{data.label}</label>
                                <progress id="progress" max={data.label.length} value={(value*100)/data.label.length}></progress>
                            </div>
                        })
                    })
                }
            </div>
            {/* <table class="charts-css line" id="my-chart">

                <tbody>
                    <tr>
                    <td style="--start: 0.0; --size: 0.4"> <span class="data"> $ 40K </span> </td>
                    </tr>
                    <tr>
                    <td style="--start: 0.4; --size: 0.2"> <span class="data"> $ 20K </span> </td>
                    </tr>
                    <tr>
                    <td style="--start: 0.2; --size: 0.6"> <span class="data"> $ 60K </span> </td>
                    </tr>
                    <tr>
                    <td style="--start: 0.6; --size: 0.4"> <span class="data"> $ 40K </span> </td>
                    </tr>
                    <tr>
                    <td style="--start: 0.4; --size: 0.8"> <span class="data"> $ 80K </span> </td>
                    </tr>
                    <tr>
                    <td style="--start: 0.8; --size: 0.6"> <span class="data"> $ 60K </span> </td>
                    </tr>
                    <tr>
                    <td style="--start: 0.6; --size: 1.0"> <span class="data"> $ 100K </span> </td>
                    </tr>
                </tbody>

            </table> */}
        </>
    )
}