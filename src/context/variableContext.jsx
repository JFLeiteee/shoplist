import { createContext, useState } from "react";
import data from "../data"

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


    return (
        <VariableContext.Provider value={{items, favoriteProducts, setFavoriteProducts, cartProducts, setCartProducts, searchResults, handleSearch}}>
            {children}
        </VariableContext.Provider>
    )
}