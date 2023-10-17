import { Link, useOutletContext, useNavigate, redirect } from "react-router-dom"
import starFilled from "../assets/star-filled.png"
import starOutline from "../assets/star-outline.png"
import heartOutline from "../assets/heart-outline.png"
import heartFilled from "../assets/heart-filled.png"
import cartIcon from "../assets/cart-icon.png"

export default function cart() {
    const [item, favoriteProducts, setFavoriteProducts, cartProducts, setCartProducts] = useOutletContext()

    let cartList = []
    let totalPrice = 0;
    let priceConverted = ""

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

    function listCart() {
        for(let i = 0; i < item.length; i++){
            if(cartProducts.includes(item[i].id)){
                cartList.push(
                    <div className="product-cart" key={item[i].id}>
                        <div onClick={() => navigate(`/product/${item[i].id}`)} key={item[i].id} className="cart-item">
                            <img src={item[i].photo} alt="imagem do produto" className="product-cart-image"/> 
                            <div>
                                <h4 className="product-name">{item[i].name}</h4>
                                <div className="review">
                                    { createStars(item[i].feedback) }
                                    <p className="product-feedback">{item[i].feedback}</p> 
                                </div>
                                <h3 style={{margin: 0}}><span className="product-price">R$ {item[i].price}</span></h3>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        return cartList
    } 

    listCart()

    function sumItems() {
        for(let i = 0; i < item.length; i++) {
            if(cartProducts.includes(item[i].id)){  
                let itemPrice = item[i].price
                totalPrice = Number.parseFloat(totalPrice) + Number.parseFloat(itemPrice)
                totalPrice = totalPrice.toFixed(2)
            }
        }
        priceConverted = totalPrice.toString()
        priceConverted = priceConverted.replace(".", ",")
        return priceConverted
    }

    sumItems()

    return(
        <div className="cart-page">
            { 
                cartList.length >= 1 
                ? 
                <>
                    <div className="cart-products">
                        { cartList }
                    </div>

                    <div className="cart-info">
                        <p>Purchase details</p>
                        <hr style={{border: "none", backgroundColor: "#d4d4d4", height: "0.010rem"}}/>
                        <div className="cart-paragraph">
                            <h6>Products({ cartList.length }): </h6>
                            <h6>R${ priceConverted }</h6>
                        </div>
                        <div className="cart-paragraph">
                            <p><strong>Total: </strong></p>
                            <p><strong>R${ priceConverted }</strong></p>
                        </div>
                        <button className="cart-buy-button"><b>Buy</b></button>
                    </div>
                </>

                : <div className="noItems-cart">
                    <p>Add items to your cart</p>
                    <p onClick={() => navigate("/")} className="search-products">Search for Products</p>
                </div>
            }
        </div>
    )
}