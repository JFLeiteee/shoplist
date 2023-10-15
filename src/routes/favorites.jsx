import { Link, useOutletContext, useNavigate, redirect } from "react-router-dom"
import starFilled from "../assets/star-filled.png"
import starOutline from "../assets/star-outline.png"
import heartOutline from "../assets/heart-outline.png"
import heartFilled from "../assets/heart-filled.png"
import cartIcon from "../assets/cart-icon.png"


export default function favorites() {
    const [item, favoriteProducts, setFavoriteProducts] = useOutletContext()

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

    function listFavorites() {
        for(let i = 0; i < item.length; i++){
            if(favoriteProducts.includes(item[i].id)){

                let priceConverted = item[i].price.toString();
                priceConverted = priceConverted.replace(".", ",")

                favoriteList.push(
                    <div className="product-card" key={item[i].id}>
                        <div className="top-buttons">
                        <div className="cart-button">
                                    <img key={item[i].id} src={cartIcon} className="cart-icon"/>
                                </div>

                            <div className="favorite-button" onClick={() => addToFavorites(item[i].id)}>
                                <img key={item[i].id} src={favoriteProducts[item[i].id - 1] ? heartFilled : heartOutline} className="heart-icon"/>
                            </div>
                        </div>

                        <div onClick={() => navigate(`/product/${item[i].id}`)} key={item[i].id} className="product">
                            <img src={item[i].photo} alt="imagem do produto" className="product-image"/> 
                            <h4 className="product-name">{item[i].name}</h4>
                            <div className="review">
                                { createStars(item[i].feedback) }
                                <p className="product-feedback">{item[i].feedback}</p> 
                            </div>
                            <h3 className="product-price">R$ {priceConverted}</h3>
                        </div>
                    </div>
                )
            }
        }
        return favoriteList
    } 

    listFavorites()

    return(
        <div className="favorite-page">
            <h1>my favorites</h1>
            <div className="home-products">
                { favoriteList }
            </div>
        </div>
    )
}