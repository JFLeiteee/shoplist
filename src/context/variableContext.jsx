import { createContext, useState } from "react";
import data from "../data"
import starFilled from "../assets/star-filled.png"

export const VariableContext = createContext();

export const ContextProvider = ({children}) => {
    const [items, setItems] = useState(data)
    const [favoriteProducts, setFavoriteProducts] = useState([]) 
    const [cartProducts, setCartProducts] = useState([])
    const [searchResults, setSearchResults] = useState([]) 

    function handleSearch(search) {
        const searchFilter = items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
        setSearchResults(searchFilter)
    }

    function createStars() {
        let starArray = <img src={starFilled} className="stars-feedback"/>
        return starArray;
    }

    return (
        <VariableContext.Provider value={{items, favoriteProducts, setFavoriteProducts, cartProducts, setCartProducts, searchResults, handleSearch, createStars}}>
            {children}
        </VariableContext.Provider>
    )
}