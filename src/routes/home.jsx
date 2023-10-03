import { Link, useOutletContext, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import starFilled from "../assets/star-filled.png"
import starOutline from "../assets/star-outline.png"
import heartOutline from "../assets/heart-outline.png"
import heartFilled from "../assets/heart-filled.png"

export default function home() {
    const [isFilterApplied, setIsFilterApplied] = useState(false)
    const [filters, setFilters] = useState([])

    const [item, favoriteProducts, setFavoriteProducts] = useOutletContext();

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
    
    return(
        <> 
            <div className="home-products">
                { 
                    isFilterApplied 
                    ? (console.log('right'))

                    : item.map(x => {
                        return ( 
                        <div className="product-card" key={x.id}>
                            <div className="favorite-button" onClick={() => addToFavorites(x.id)}>
                                <img key={x.id} src={favoriteProducts[x.id - 1] ? heartFilled : heartOutline} className="heart-icon"/>
                            </div>

                            <div onClick={() => navigate(`product/${x.id}`)} key={x.id} className="product">
                                <img src={x.photo} alt="imagem do produto" className="product-image"/> 
                                <h4 className="product-name">{x.name}</h4>
                                <div className="review">
                                    { createStars(x.feedback) }
                                    <p className="product-feedback">{x.feedback}</p> 
                                </div>
                                <h3 className="product-price">R$ {x.price}</h3>
                            </div>
                        </div>
                    )}
                    )
                }
            </div>
        </>
    )
}
