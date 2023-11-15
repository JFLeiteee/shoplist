import { Outlet } from "react-router-dom"
import Searchbar from "./components/Searchbar"
import data from "./data"
import { useState, createContext, useContext } from "react"
import { VariableContext } from "./context/variableContext"

function App() {

  const { handleSearch } = useContext(VariableContext)

  return (
    <div className="main-container">
        <Searchbar onSearch={handleSearch}/>
        <div className="outlet">
          <Outlet />
        </div>
    </div>
  )
}

export default App
