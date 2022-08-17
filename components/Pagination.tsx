import { useState } from "react";

const Pagination=()=>{
    const[numberOfPages, setNumberOfPages] = useState(10);
    return (
        <div style={{backgroundColor: 'white'}}>
            <span>
                <div>
                    index in All
                </div>
                <div style={{width: '200px', }}>
                    <ul style={{display: 'flex', justifyContent: 'space-between'}}>
                        <li>
                            <a> &lt; </a>
                        </li>
                        <li>
                            <a>1</a>
                            <a>2</a>
                            <a>3</a>
                            <a>4</a>
                            <a>5</a>
                        </li>
                        <li>
                            <a> &gt; </a>
                        </li>
                        <li>
                            <input type="number" min="0"  max={numberOfPages}/>
                        </li>
                    </ul>
                </div>
            </span>
            
        </div>
    )
}

export default Pagination;