import { Link } from "react-router-dom"
import { useContext } from "react"
import { VariableContext } from "../context/variableContext"
import { useNavigate } from "react-router-dom";
import colorHeart from "../assets/color-heart.png"
import colorCart from "../assets/color-cart.png" 

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
            <Link to="favorites" className="searchbar-navigate">
                <img src={colorHeart} className="searchbar-icon"/>
            </Link>
            <Link to="cart" className="searchbar-navigate" style={{position: "relative"}}>
                <img src={colorCart} alt="" className="searchbar-icon"/>
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