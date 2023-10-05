import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Searchbar from "./components/Searchbar"
import data from "./data"
import { useState } from "react"

function App() {

  const [items, setItems] = useState(data)


  const [favoriteProducts, setFavoriteProducts] = useState([]) 
  const [cartProducts, setCartProducts] = useState([]) 

  return (
    <>
        <Searchbar />
        <div className="outlet">
          <Outlet 
            context={[items, favoriteProducts, setFavoriteProducts, cartProducts, setCartProducts]}
          />
        </div>
    </>
  )
}

export default App
