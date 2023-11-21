import { useNavigate } from "react-router-dom"
import heartOutline from "../assets/heart-outline.png"
import heartFilled from "../assets/heart-filled.png"
import { useContext } from "react"
import { VariableContext } from "../context/variableContext"

export default function favorites() {
    const {items, favoriteProducts, setFavoriteProducts, createStars} = useContext(VariableContext)

    let favoriteList = []

    const navigate = useNavigate();

    const addToFavorites = (id) => {
        if(favoriteProducts.includes(id) == false){
            const updatedFavorites = [...favoriteProducts]
            updatedFavorites.push(id);
            setFavoriteProducts(updatedFavorites);
        } 
        else {
            const updatedFavorites = [...favoriteProducts]
            updatedFavorites.splice(updatedFavorites.indexOf(id), 1)
            setFavoriteProducts(updatedFavorites);
        }
    }

    function listFavorites() {
            console.log("fp: " + favoriteProducts)
            favoriteProducts.map(i => {
                console.log("i:" + i)
                favoriteList.push(
                    <div className="product-card" key={items[i - 1].id}>
                        <div className="top-buttons">
                            <div className="favorite-button" onClick={() => addToFavorites(items[i - 1].id)}>
                                <img key={items[i - 1].id} src={favoriteProducts.includes(items[i - 1]?.id) ? heartFilled : heartOutline} className="heart-icon"/>
                            </div>
                        </div>

                        <div onClick={() => navigate(`/product/${items[i - 1].id}`)} key={items[i - 1].id} className="product">
                            <img src={items[i - 1].photo} alt="imagem do produto" className="product-image"/>
                            <div className="about-product">    
                                <h4 className="product-name">{items[i - 1].name}</h4>
                                <div className="review">
                                    { createStars(items[i - 1].feedback) }
                                    <p className="product-feedback">{items[i - 1].feedback}</p> 
                                </div>
                                <h3 className="product-price">R$ {items[i - 1].price}</h3>
                            </div> 
                        </div>
                    </div>
                )
            }
        )
        return favoriteList
    } 

    listFavorites()

    return(
        <div className="favorite-page">
            {   
                favoriteList.length >= 1
                ?   <>
                    <h1>my favorites</h1>
                    <div className="home-products">
                        { favoriteList }
                    </div>
                </>

                : <p>Add items to your favorite</p>
            }
        </div>
    )
}