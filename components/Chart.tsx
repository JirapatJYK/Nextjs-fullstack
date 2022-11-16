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
                        return <>
                            {
                                data.data.map((value)=>{
                                    return<div className="chart-value"></div>
                                })
                            }
                        </>
                    })
                }
            </div>
        </>
    )
}