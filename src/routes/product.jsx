import { useParams, useOutletContext } from "react-router-dom"
import starFilled from "../assets/star-filled.png"
import starOutline from "../assets/star-outline.png"
import heartOutline from "../assets/heart-outline.png"
import heartFilled from "../assets/heart-filled.png"
import colorCart from "../assets/color-cart.png"

export default function product() {
    const { id } = useParams();

    const [item, favoriteProducts, setFavoriteProducts, cartProducts, setCartProducts] = useOutletContext();

    let priceConverted = item[id - 1].price.toString()
    priceConverted = priceConverted.replace(".", ",")

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
        <div className="product-page">
            <div className="superior">
                <div className="product-image-container">
                    <img src={item[id - 1].photo} alt="product image" className="product-showoff"/>
                </div>
                <div className="product-related">
                    <div className="review">
                        {createStars(item[id - 1].feedback)}
                        <h3 className="product-feedback">{item[id - 1].feedback}</h3>

                        <div id="favorite-button-product" onClick={() => addToFavorites(item[id - 1].id)}>
                            <img key={item[id - 1].id} src={favoriteProducts[item[id - 1].id - 1] ? heartFilled : heartOutline} className="heart-icon"/>
                        </div>
                    </div>
                    <h1 style={{marginTop: "0"}}>{item[id - 1].name}</h1>
                    <h2><span className="product-price">R$ {priceConverted}</span></h2>
                    <div className="product-buttons" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <button className="buy-button"><b>Buy</b></button>
                        <button className="product-cart-button" onClick={() => addToCart(item[id - 1].id)}>
                            <div style={{display: "flex", justifyContent: "center", placeItems:"center", gap:".5rem"}}>
                                <img src={colorCart} className="cart-icon"/>
                                <b>Add to cart</b>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}