import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Searchbar from "./components/Searchbar"
import data from "./data"
import { useState } from "react"

function App() {

  const [items, setItems] = useState(data)

  let favorites = []
  for(let i = 0; i <= items.length - 1; i++) {
    favorites.push(false);
  }
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
