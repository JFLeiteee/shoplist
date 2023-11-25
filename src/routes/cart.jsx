import { useNavigate} from "react-router-dom"
import { useContext } from "react"
import { VariableContext } from "../context/variableContext"

export default function cart() {
    const {items, cartProducts, setCartProducts, createStars, setNumberOfCart, quantity, setQuantity} = useContext(VariableContext)

    let cartList = []
    let totalPrice = 0;
    let priceConverted = ""
    let totalItems = 0;
    let numberItems = 0;

    const navigate = useNavigate();

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

    function handleQuantity(index) {
        if(quantity[index] !== 0) {
            let updatedQuantity = [...quantity];
            updatedQuantity[index] = event.target.value == "-" ? updatedQuantity[index] - 1 : updatedQuantity[index] + 1 
            setQuantity(updatedQuantity)
        } 
        else if (quantity[index] == 0 && event.target.value == "+") {
            let updatedQuantity = [...quantity];
            updatedQuantity[index] = updatedQuantity[index] + 1
            setQuantity(updatedQuantity)
        }
        else {
            return
        }
    }

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
                                    onClick={() => handleQuantity(i - 1)} 
                                    value={"-"}>
                                    -
                                </button>
                                <p
                                    className="number-quantity">
                                    {quantity[i - 1]}
                                </p>
                                <button 
                                    className="quantity-button" 
                                    onClick={() => handleQuantity(i - 1)}
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
                let itemsPrice = items[i].price * quantity[i]
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
        for(let i = 0; i < items.length; i++) {
            if(cartProducts.includes(items[i].id)) {
                totalItems = totalItems + quantity[i]
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