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
    
    return(
        <> 
            <img src={banner} className="banner"/>
            <div className="home-products">
                { 
                    searchResults != ""
                    ? searchResults.map(x => {

                        return ( 
                        <div className="product-card" key={x.id}>
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
