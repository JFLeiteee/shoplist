import { createContext, useState } from "react";
import data from "../data"
import starFilled from "../assets/star-filled.png"
import starOutline from "../assets/star-outline.png"

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

    function createStars(feedback) {
        let starArray = []
        for(let i = 0; i <= 4; i++){
            starArray.push(<img key={i} src={feedback >= i + 1 ? starFilled : starOutline} alt="" className="stars-feedback"/>)
        }
        return starArray;
    }

    return (
        <VariableContext.Provider value={{items, favoriteProducts, setFavoriteProducts, cartProducts, setCartProducts, searchResults, handleSearch, createStars}}>
            {children}
        </VariableContext.Provider>
    )
}