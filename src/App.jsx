import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Searchbar from "./components/Searchbar"
import data from "./data"
import { useState } from "react"

function App() {

  const [items, setItems] = useState(data)

  const [favoriteProducts, setFavoriteProducts] = useState([]) 
  const [cartProducts, setCartProducts] = useState([])
  const [searchResults, setSearchResults] = useState([]) 

  function handleSearch(search) {
    const searchFilter = items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    setSearchResults(searchFilter)
  }

  return (
    <>
        <Searchbar onSearch={handleSearch}/>
        <div className="outlet">
          <Outlet 
            context={[items, favoriteProducts, setFavoriteProducts, cartProducts, setCartProducts, searchResults]}
          />
        </div>
    </>
  )
}

export default App
