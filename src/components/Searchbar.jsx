import { Link } from "react-router-dom"
import { useContext } from "react"
import { VariableContext } from "../context/variableContext"
import { useNavigate } from "react-router-dom";

export default function searchbar() {

    const {numberOfCart, search, setSearch } = useContext(VariableContext);
    
    function handleChange(event) {
        setSearch(event.target.value)
    }

    const navigate = useNavigate();

    function handleSearch(){
        event.preventDefault();
        if(search != ""){
            navigate(`/search/${search}`)
        }
    }

    return(
        <div className="searchbar">
            { window.innerWidth > 425 ? <Link to="/" className="searchbar-navigate"><h2 className="sb-home">OmniMart</h2></Link> : null }
            <form onSubmit={() => handleSearch()}>
                <input 
                    type="text" 
                    placeholder="Search for a product" 
                    className="searchbar-search" 
                    onChange={handleChange}
                />
            </form>
            <Link to="favorites" className="searchbar-navigate">S2</Link>
            <Link to="cart" className="searchbar-navigate" style={{position: "relative"}}>
                C
                    {
                        numberOfCart > 0
                        ? <div className="number-cart">
                            <p>{numberOfCart}</p>
                        </div>
                        : null
                    }
            </Link>
        </div>
    )
}