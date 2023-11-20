import { useOutletContext, Link } from "react-router-dom"
import { useState, useContext } from "react"
import { VariableContext } from "../context/variableContext"

export default function searchbar({onSearch}) {
    const [search, setSearch] = useState()

    function handleChange(event) {
        setSearch(event.target.value)
        onSearch(search)
    }   

    const {cartProducts, setCartProducts , items} = useContext(VariableContext);

    // let cartTotal = cartProducts.length;

    return(
        <div className="searchbar">
            <Link to="/" className="searchbar-navigate"><h2 className="sb-home">OmniMart</h2></Link>
            <input 
                type="text" 
                placeholder="Search for a product" 
                className="searchbar-search" 
                onChange={handleChange}
            />
            <Link to="favorites" className="searchbar-navigate">Favorites</Link>
            <Link to="cart" className="searchbar-navigate">
                {/* {
                    cartProducts >= 1
                    ? <p>{cartTotal}</p>
                    : <div></div>
                } */}
                Cart
            </Link>
        </div>
    )
}