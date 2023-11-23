import { useNavigate} from "react-router-dom"
import { useState, useContext } from "react"
import { VariableContext } from "../context/variableContext"

export default function cart() {
    const {items, cartProducts, setCartProducts, createStars, quantities, setQuantities, setNumberOfCart} = useContext(VariableContext)

    let cartList = []
    let totalPrice = 0;
    let priceConverted = ""
    let totalItems = 0;

    const navigate = useNavigate();

    function givingValue() {
        for(let i = 0; i <= cartProducts.length; i++) {
            if(quantities[i] == undefined || quantities[i] == "") {
                const updatedQuantity = [...quantities]
                updatedQuantity[i] = 1
                setQuantities(updatedQuantity)
            } else {
                return
            }
        }
    }

    givingValue()

    const addToCart = (id) => {
        if(cartProducts.includes(id) == false){
            const updatedCart = [...cartProducts];
            updatedCart.push(id);
            setCartProducts(updatedCart)
        } else {
            const updatedCart = [...cartProducts];
            updatedCart.splice(updatedCart.indexOf(id), 1)
            setNumberOfCart(prevNumber => prevNumber - 1)
            setCartProducts(updatedCart)
        }
    }

    const handleQuantity = (id) => {
        console.log("id :" + id)
        if(quantities[id - 1] != 0) {
            if(event.target.value === "-"){
                const updatedQuantity = [...quantities]
                updatedQuantity[id - 1] = updatedQuantity[id - 1] - 1
                setQuantities(updatedQuantity)
            } else {
                const updatedQuantity = [...quantities]
                updatedQuantity[id - 1] = updatedQuantity[id - 1] + 1
                setQuantities(updatedQuantity)
            }
        } else {
            return
        }
    }

    console.log("quantity: " + quantities[0])
    console.log("cart:" + cartProducts)

    function listCart() {
        cartProducts.map(i => {
                cartList.push(
                    <div className="product-cart" key={items[i - 1].id}>
                        <div onClick={() => navigate(`/product/${items[i - 1].id}`)} key={items[i - 1].id} className="cart-item">
                            <img src={items[i - 1].photo} alt="imagem do produto" className="product-cart-image"/> 
                            <div>
                                <h4 className="cart-product-name">{items[i - 1].name}</h4>
                                <div className="review">
                                    { createStars(items[i - 1].feedback) }
                                    <p className="product-feedback">{items[i - 1].feedback}</p> 
                                </div>
                                <h3 style={{margin: 0}}><span className="product-price">R$ {items[i - 1].price}</span></h3>
                            </div>
                        </div>
                        <div className="cart-options">
                            <div className="cart-quantity">    
                                <button 
                                    className="quantity-button" 
                                    onClick={() => handleQuantity(quantities[cartProducts.indexOf(items[i - 1].id)])} 
                                    value={"-"}>
                                    -
                                </button>
                                <p
                                    className="number-quantity">
                                    {quantities[cartProducts.indexOf(items[i - 1].id)]}
                                </p>
                                <button 
                                    className="quantity-button" 
                                    onClick={() => handleQuantity(quantities[cartProducts.indexOf(items[i - 1].id)])}
                                    value={"+"}>
                                    +
                                </button>
                            </div>
                        </div>
                            <p className="cart-delete-item" onClick={() => addToCart(items[i - 1].id)}>Excluir</p>
                    </div>
                )
            }
        )
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

    function sumQuantity() {
        totalItems = cartList.length
        for(let i = 0; i <= quantities.length; i++) {
            if(quantities[i] > 1){
                totalItems = cartList.length + (quantities[i] - 1);
            }
        }
        return totalItems 
    }

    sumQuantity()

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