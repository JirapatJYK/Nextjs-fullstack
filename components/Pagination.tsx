import { useState } from "react";

const Pagination=()=>{
    const[numberOfPages, setNumberOfPages] = useState(10);
    return (
        <div style={{backgroundColor: 'white', position: 'fixed', bottom: 0, height: '60px', width: 'inherit'}}>
            <span >
                <div style={{margin: 'auto 0'}}>
                    index in All
                </div>
                <div style={{width: '200px', }}>
                    <ul style={{display: 'flex', justifyContent: 'space-between'}}>
                        <li>
                            <button> &lt; </button>
                        </li>
                        <li >
                            <a>1</a>
                            <a>2</a>
                            <a>3</a>
                            <a>4</a>
                            <a>5</a>
                        </li>
                        <li>
                            <button> &gt; </button>
                        </li>
                        <li>
                            <input type="number" min="0"  max={numberOfPages} style={{backgroundColor: 'var(--text-secondary)'}}/>
                        </li>
                    </ul>
                </div>
            </span>
            
        </div>
    )
}

export default Pagination;