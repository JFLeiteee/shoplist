import { useNavigate } from "react-router-dom"
import { useState, useContext   } from "react";
import heartOutline from "../assets/heart-outline.png"
import heartFilled from "../assets/heart-filled.png"
import cartIcon from "../assets/cart-icon.png"
import doneIcon from "../assets/done-icon.png"
import banner from "../../public/img/banner.png"
import { VariableContext } from "../context/variableContext"

export default function home() {

    const {items, favoriteProducts, setFavoriteProducts, cartProducts, setCartProducts, searchResults, createStars} = useContext(VariableContext)

    const navigate = useNavigate();

    let priceConverted = ""

    const addToFavorites = (id) => {
        if(favoriteProducts.includes(id) == false){
            const updatedFavorites = [...favoriteProducts]
            updatedFavorites.push(id);
            console.log(updatedFavorites)
            setFavoriteProducts(updatedFavorites);
        } 
        else {
            console.log('entrou aqui')
            const updatedFavorites = [...favoriteProducts]
            updatedFavorites.splice(updatedFavorites.indexOf(id), 1)
            console.log(updatedFavorites)
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
    
    return(
        <> 
            <img src={banner} className="banner"/>
            <div className="home-products">
                { 
                    searchResults != ""
                    ? searchResults.map(x => {

                        return ( 
                        <div className="product-card" key={x.id}>
                            <div className="top-buttons">
                                <div className="cart-button" onClick={() => addToCart(x.id)}>
                                    <img key={x.id} src={cartIcon} className="cart-icon"/>
                                </div>
                                <div className="favorite-button" onClick={() => addToFavorites(x.id)}>
                                    <img key={x.id} src={favoriteProducts.includes(x.id) ? heartFilled : heartOutline} className="heart-icon"/>
                                </div>
                            </div>

                            <div onClick={() => navigate(`product/${x.id}`)} key={x.id} className="product">
                                <img src={x.photo} alt="imagem do produto" className="product-image"/>
                                <div className="about-product">
                                    <h4 className="product-name">{x.name}</h4>
                                    <div className="review">
                                        { createStars(x.feedback) }
                                        <p className="product-feedback">{x.feedback}</p> 
                                    </div>
                                    <h3 className="product-price">R$ {priceConverted}</h3>
                                </div> 
                            </div>
                        </div>
                    )})

                    : items.map(x => {

                        priceConverted = x.price.toString();
                        priceConverted = priceConverted.replace(".", ",")

                        return ( 
                        <div className="product-card" key={x.id}>
                            <div className="top-buttons">
                                <div className="cart-button" onClick={() => addToCart(x.id)}>
                                    <img key={x.id} src={cartProducts.includes(x.id) ? doneIcon : cartIcon} className="cart-icon"/>
                                </div>
                                <div className="favorite-button" onClick={() => addToFavorites(x.id)}>
                                    <img key={x.id} src={favoriteProducts.includes(x.id) ? heartFilled : heartOutline} className="heart-icon"/>
                                </div>
                            </div>

                            <div onClick={() => navigate(`product/${x.id}`)} key={x.id} className="product">
                                <img src={x.photo} alt="imagem do produto" className="product-image"/>
                                <div className="about-product">      
                                    <h4 className="product-name">{x.name}</h4>
                                    <div className="review">
                                        { createStars(x.feedback) }
                                        <p className="product-feedback">{x.feedback}</p> 
                                    </div>
                                    <h3 className="product-price">R$ {priceConverted}</h3>
                                </div> 
                            </div>
                        </div>
                    )})
                }
            </div>
        </>
    )
}
