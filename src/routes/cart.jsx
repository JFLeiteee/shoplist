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

    function listCart() {
        for(let i = 0; i < item.length; i++){
            if(cartProducts.includes(item[i].id)){
                cartList.push(
                    <div className="product-cart" key={item[i].id}>
                        <div className="top-buttons">
                            <div className="cart-button">
                                <img key={item[i].id} src={cartIcon} className="cart-icon"/>
                            </div>

                            <div className="favorite-button" onClick={() => addToFavorites(item[i].id)}>
                                <img key={item[i].id} src={favoriteProducts[item[i].id - 1] ? heartFilled : heartOutline} className="heart-icon"/>
                            </div>
                        </div>

                        <div onClick={() => navigate(`/product/${item[i].id}`)} key={item[i].id} className="cart-item">
                            <img src={item[i].photo} alt="imagem do produto" className="product-cart-image"/> 
                            <div>
                                <h4 className="product-name">{item[i].name}</h4>
                                { createStars(item[i].feedback) }
                                <p className="product-feedback">{item[i].feedback}</p> 
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
        <div>
            <div className="cart-products">
                { cartList }
            </div>

            <div className="cart-info">
                <p>Total price: R${ priceConverted }</p>
            </div>
        </div>
    )
}