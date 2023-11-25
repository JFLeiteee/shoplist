import { Outlet } from "react-router-dom"
import Searchbar from "./components/Searchbar"
import Footer from "./components/Footer"

function App() {

  return (
    <div className="main-container">
        <Searchbar/>
        <div className="outlet">
          <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default App
