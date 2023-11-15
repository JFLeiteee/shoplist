import { useNavigate } from "react-router-dom"
import { useState, useContext   } from "react";
import starFilled from "../assets/star-filled.png"
import starOutline from "../assets/star-outline.png"
import heartOutline from "../assets/heart-outline.png"
import heartFilled from "../assets/heart-filled.png"
import cartIcon from "../assets/cart-icon.png"
import { VariableContext } from "../context/variableContext"

export default function home() {

    const {items, favoriteProducts, setFavoriteProducts, cartProducts, setCartProducts, searchResults} = useContext(VariableContext)

    const navigate = useNavigate();

    let priceConverted = ""

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
    
    return(
        <> 
            <div className="home-products">
                { 
                    searchResults != ""
                    ? searchResults.map(x => {

                        priceConverted = x.price.toString();
                        priceConverted = priceConverted.replace(".", ",")

                        return ( 
                        <div className="product-card" key={x.id}>
                            <div className="top-buttons">
                                <div className="cart-button" onClick={() => addToCart(x.id)}>
                                    <img key={x.id} src={cartIcon} className="cart-icon"/>
                                </div>
                                <div className="favorite-button" onClick={() => addToFavorites(x.id)}>
                                    <img key={x.id} src={favoriteProducts[x.id - 1] ? heartFilled : heartOutline} className="heart-icon"/>
                                </div>
                            </div>

                            <div onClick={() => navigate(`product/${x.id}`)} key={x.id} className="product">
                                <img src={x.photo} alt="imagem do produto" className="product-image"/> 
                                <h4 className="product-name">{x.name}</h4>
                                <div className="review">
                                    { createStars(x.feedback) }
                                    <p className="product-feedback">{x.feedback}</p> 
                                </div>
                                <h3 className="product-price">R$ {priceConverted}</h3>
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
                                    <img key={x.id} src={cartIcon} className="cart-icon"/>
                                </div>
                                <div className="favorite-button" onClick={() => addToFavorites(x.id)}>
                                    <img key={x.id} src={favoriteProducts[x.id - 1] ? heartFilled : heartOutline} className="heart-icon"/>
                                </div>
                            </div>

                            <div onClick={() => navigate(`product/${x.id}`)} key={x.id} className="product">
                                <img src={x.photo} alt="imagem do produto" className="product-image"/> 
                                <h4 className="product-name">{x.name}</h4>
                                <div className="review">
                                    { createStars(x.feedback) }
                                    <p className="product-feedback">{x.feedback}</p> 
                                </div>
                                <h3 className="product-price">R$ {priceConverted}</h3>
                            </div>
                        </div>
                    )})
                }
            </div>
        </>
    )
}
