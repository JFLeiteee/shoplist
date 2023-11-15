import { Link, useOutletContext, useNavigate, redirect } from "react-router-dom"
import { useState, useContext } from "react"
import starFilled from "../assets/star-filled.png"
import starOutline from "../assets/star-outline.png"
import { VariableContext } from "../context/variableContext"

export default function cart() {
    const {items, favoriteProducts, setFavoriteProducts, cartProducts, setCartProducts} = useContext(VariableContext)

    let cartList = []
    let totalPrice = 0;
    let priceConverted = ""
    let totalItems = 0;

    const navigate = useNavigate();

    function createStars(feedback) {
        let starArray = []
        for(let i = 0; i <= 4; i++){
            starArray.push(<img key={i} src={feedback >= i + 1 ? starFilled : starOutline} alt="" className="stars-feedback"/>)
        }
        return starArray;
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

    function listCart() {
        for(let i = 0; i < items.length; i++){
            if(cartProducts.includes(items[i].id)){
                let priceConverted = items[i].price.toString();
                priceConverted = priceConverted.replace(".", ",")

                const [quantity, setQuantity] = useState(1);

                function handleQuantity(){
                    if(event.target.value === "-"){
                        setQuantity(quantity => quantity - 1);
                    } else {
                        setQuantity(quantity => quantity + 1);
                    }
                }

                cartList.push(
                    <div className="product-cart" key={items[i].id}>
                        <div onClick={() => navigate(`/product/${items[i].id}`)} key={items[i].id} className="cart-item">
                            <img src={items[i].photo} alt="imagem do produto" className="product-cart-image"/> 
                            <div>
                                <h4 className="product-name">{items[i].name}</h4>
                                <div className="review">
                                    { createStars(items[i].feedback) }
                                    <p className="product-feedback">{items[i].feedback}</p> 
                                </div>
                                <h3 style={{margin: 0}}><span className="product-price">R$ {priceConverted}</span></h3>
                                <h3 style={{margin: 0}}><span className="product-price">R$ {items[i].price}</span></h3>
                            </div>
                        </div>
                        <div className="cart-options">
                            <div className="cart-quantity">    
                                <button className="quantity-button" onClick={handleQuantity} value={"-"}>-</button>
                                <p className="number-quantity">{quantity}</p>
                                <button className="quantity-button" onClick={handleQuantity} value={"+"}>+</button>
                            </div>
                        </div>
                            <p className="cart-delete-item" onClick={() => addToCart(item[i].id)}>Excluir</p>
                    </div>
                )
            }
        }
        return cartList
    } 

    listCart()

    function sumItems() {
        for(let i = 0; i < items.length; i++) {
            if(cartProducts.includes(items[i].id)){  
                let itemsPrice = items[i].price
                totalPrice = Number.parseFloat(totalPrice) + Number.parseFloat(itemsPrice)
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
                            <h6>Products({ totalItems }): </h6>
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