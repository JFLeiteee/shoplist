import { Link } from "react-router-dom"
export default function searchbar() {
    return(
        <div className="searchbar">
            <Link to="/" className="searchbar-navigate">Home</Link>
            <input type="text" placeholder="Search for a product" className="searchbar-search"/>
            <Link to="favorites" className="searchbar-navigate">Favorites</Link>
            <Link to="cart" className="searchbar-navigate">Cart</Link>
        </div>
    )
}