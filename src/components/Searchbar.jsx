import { useOutletContext, Link } from "react-router-dom"
import { useState, useContext } from "react"
import { VariableContext } from "../context/variableContext"

export default function searchbar({onSearch}) {
    const [search, setSearch] = useState()

    function handleChange(event) {
        setSearch(event.target.value)
        onSearch(search)
    }   

    const {cartProducts, setCartProducts , items, numberOfCart} = useContext(VariableContext);

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
            <Link to="cart" className="searchbar-navigate" style={{position: "relative"}}>
                Cart
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