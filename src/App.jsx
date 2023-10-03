import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Searchbar from "./components/Searchbar"
import data from "./data"
import { useState } from "react"

function App() {

  const [items, setItems] = useState(data)

  let favorites = []
  const [favoriteProducts, setFavoriteProducts] = useState(favorites) 

  return (
    <>
        <Searchbar />
        <div className="outlet">
          <Outlet 
            context={[items, favoriteProducts, setFavoriteProducts]}
          />
        </div>
    </>
  )
}

export default App
