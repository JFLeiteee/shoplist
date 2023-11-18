import { Link, useOutletContext, useNavigate, redirect } from "react-router-dom"
import starFilled from "../assets/star-filled.png"
import starOutline from "../assets/star-outline.png"
import heartOutline from "../assets/heart-outline.png"
import heartFilled from "../assets/heart-filled.png"
import cartIcon from "../assets/cart-icon.png"
import { useContext } from "react"
import { VariableContext } from "../context/variableContext"

export default function favorites() {
    const {items, favoriteProducts, setFavoriteProducts, cartProducts, setCartProducts, createStars} = useContext(VariableContext)

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

    const addToCart = (id) => {
        if(cartProducts.includes(id) == false){
            const updatedCart = [...cartProducts];
            updatedCart.push(id);
            setCartProducts(updatedCart)
        } else {
            const updatedCart = [...cartProducts];
            updatedCart.splice(updatedCart.indexOf(id), 1)
            setCartProducts(updatedCart)
        }
    }

    function listFavorites() {
       
            favoriteProducts.map(i => {

                let priceConverted = items[i - 1].price.toString();
                priceConverted = priceConverted.replace(".", ",")

                favoriteList.push(
                    <div className="product-card" key={items[i - 1].id}>
                        <div className="top-buttons">
                        <div className="cart-button" onClick={() => addToCart(items[i - 1].id)}>
                                    <img key={items[i - 1].id} src={cartIcon} className="cart-icon"/>
                                </div>

                            <div className="favorite-button" onClick={() => addToFavorites(items[i - 1].id)}>
                                <img key={items[i - 1].id} src={favoriteProducts.includes(items[i - 1].id) ? heartFilled : heartOutline} className="heart-icon"/>
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
                                <h3 className="product-price">R$ {priceConverted}</h3>
                            </div> 
                        </div>
                    </div>
                )
            }
        )
        console.log(favoriteList)
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