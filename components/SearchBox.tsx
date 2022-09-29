export default function SearchBox(){
    return (
        <div className="search-box">
            <input type="search" placeholder="search..." />
            <button className="fa fa-search" style={{color: "red"}}></button>
        </div>
    )
}