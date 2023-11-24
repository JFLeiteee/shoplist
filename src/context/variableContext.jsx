import { createContext, useState } from "react";
import data from "../data"
import starFilled from "../assets/star-filled.png"

export const VariableContext = createContext();

export const ContextProvider = ({children}) => {
    const [items, setItems] = useState(data)
    const [favoriteProducts, setFavoriteProducts] = useState([]) 
    const [cartProducts, setCartProducts] = useState([])
    const [searchResults, setSearchResults] = useState([]) 
    const [quantities, setQuantities] = useState([]);
    const [numberOfCart, setNumberOfCart] = useState(0)
    const [search, setSearch] = useState()


    const searchFilter = items.filter((item) =>  {
        if(search === "") {
            return item
        } else {
            return item.name.toLowerCase().includes(search)
        }
    })

    function createStars() {
        let starArray = <img src={starFilled} className="stars-feedback"/>
        return starArray;
    }

    return (
        <VariableContext.Provider 
            value={{
                items, 
                favoriteProducts, 
                setFavoriteProducts, 
                cartProducts, 
                setCartProducts, 
                searchResults,
                searchFilter, 
                createStars, 
                quantities, 
                setQuantities,
                numberOfCart,
                setNumberOfCart,
                search,
                setSearch,
            }}>
            {children}
        </VariableContext.Provider>
    )
}