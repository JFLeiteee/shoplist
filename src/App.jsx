import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Searchbar from "./components/Searchbar"
import data from "./data"
import { useState } from "react"

function App() {

  const [items, setItems] = useState(data)

  const parent = document.getElementById("parent");

  return (
    <>
        <Searchbar />
        <div className="outlet">
          <Outlet 
            context={items}  
          />
        </div>
    </>
  )
}

export default App
