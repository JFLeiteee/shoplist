import { Link, useOutletContext, useNavigate, redirect } from "react-router-dom"
import starFilled from "../assets/star-filled.png"
import starOutline from "../assets/star-outline.png"
import heartOutline from "../assets/heart-outline.png"
import heartFilled from "../assets/heart-filled.png"
import cartIcon from "../assets/cart-icon.png"
import { useContext } from "react"
import { VariableContext } from "../context/variableContext"

export default function favorites() {
    const {items, favoriteProducts, setFavoriteProducts, cartProducts, setCartProducts} = useContext(VariableContext)

    let favoriteList = []

    const navigate = useNavigate();

    function createStars(feedback) {
        let starArray = []
        for(let i = 0; i <= 4; i++){
            starArray.push(<img key={i} src={feedback >= i + 1 ? starFilled : starOutline} alt="" className="stars-feedback"/>)
        }
        return starArray;
    }

    const addToFavorites = (id) => {
        if(favoriteProducts[id - 1] == undefined) {
            const updatedFavorites = [...favoriteProducts];
            updatedFavorites[id - 1] = id;
            setFavoriteProducts(updatedFavorites)
        } else {
            const updatedFavorites = [...favoriteProducts];
            updatedFavorites[id - 1] = undefined;
            setFavoriteProducts(updatedFavorites)
        }
    }

    const addToCart = (id) => {
        if(cartProducts[id - 1] == undefined) {
            const updatedCart = [...cartProducts];
            updatedCart[id - 1] = id;
            setCartProducts(updatedCart)
        } else {
            const updatedCart = [...cartProducts];
            updatedCart[id - 1] = undefined;
            setCartProducts(updatedCart)
        }
    }

    function listFavorites() {
        for(let i = 0; i < items.length; i++){
            if(favoriteProducts.includes(items[i].id)){

                let priceConverted = items[i].price.toString();
                priceConverted = priceConverted.replace(".", ",")

                favoriteList.push(
                    <div className="product-card" key={items[i].id}>
                        <div className="top-buttons">
                        <div className="cart-button" onClick={() => addToCart(items[i].id)}>
                                    <img key={items[i].id} src={cartIcon} className="cart-icon"/>
                                </div>

                            <div className="favorite-button" onClick={() => addToFavorites(items[i].id)}>
                                <img key={items[i].id} src={favoriteProducts[items[i].id - 1] ? heartFilled : heartOutline} className="heart-icon"/>
                            </div>
                        </div>

                        <div onClick={() => navigate(`/product/${items[i].id}`)} key={items[i].id} className="product">
                            <img src={items[i].photo} alt="imagem do produto" className="product-image"/> 
                            <h4 className="product-name">{items[i].name}</h4>
                            <div className="review">
                                { createStars(items[i].feedback) }
                                <p className="product-feedback">{items[i].feedback}</p> 
                            </div>
                            <h3 className="product-price">R$ {priceConverted}</h3>
                        </div>
                    </div>
                )
            }
        }
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