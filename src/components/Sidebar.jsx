import { Link } from "react-router-dom"

export default function sidebar() {
    return(
        <div className="sidebar">
            <div className="sidebar-pages">
                <Link to="/cart" className="sidebar-page">Cart</Link>
                <Link to="/favorites" className="sidebar-page">Favorites</Link>
            </div>
        </div>
    )
}