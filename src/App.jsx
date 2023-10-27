import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Searchbar from "./components/Searchbar"
import data from "./data"
import { useState, createContext, useContext } from "react"

function App() {

  const [items, setItems] = useState(data)

  const [favoriteProducts, setFavoriteProducts] = useState([]) 
  const [cartProducts, setCartProducts] = useState([])
  const [searchResults, setSearchResults] = useState([]) 
  const [numberCartProducts, setNumberCartProducts] = useState(0) 

  function handleSearch(search) {
    const searchFilter = items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    setSearchResults(searchFilter)
  }

  return (
      <div className="main-container">
          <Searchbar onSearch={handleSearch} />
          <div className="outlet">
            <Outlet/>
          </div>
      </div>
  )
}

export default App
