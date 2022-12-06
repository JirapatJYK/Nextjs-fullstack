
type Props = {
    time: string;
    plan: Function;
}[]

export default function Timeline(){
    const data = [
        {
            time: "2020",
            plan: "Story and theme design"
        },
        {
            time: "2020",
            plan: "Character design"
        },
        {
            time: "2020",
            plan: "Core game design"
        },
        {
            time: "2020",
            plan: "Mission design"
        },
        {
            time: "2020",
            plan: "Development"
        },
    ]
    return(
        <div className="timeline">
            <ul>
                {data.map(plan=>{
                    return<li>
                <div className='timeline-content'>
                  <h2>{plan.time}</h2>
                  <p>
                    {plan.plan}
                  </p>
                </div>
              </li>
                })}
            </ul>
          </div>
    )
}