import { useParams, useOutletContext } from "react-router-dom"
import starFilled from "../assets/star-filled.png"
import starOutline from "../assets/star-outline.png"

export default function product() {
    const { id } = useParams();

    const item = useOutletContext();

    function createStars(feedback) {
        let starArray = []
        for(let i = 0; i <= 4; i++){
            starArray.push(<img key={i} src={feedback >= i + 1 ? starFilled : starOutline} alt="" className="stars-feedback"/>)
        }
        return starArray;
    }

    return(
        <div className="product-page">
            <img src={item[id - 1].photo} alt="product image" className="product-image"/>
            <div className="product-related">
                <div className="review">
                    {createStars(item[id - 1].feedback)}
                    <h3 className="product-feedback">{item[id - 1].feedback}</h3>   
                </div>
                <h1>{item[id - 1].name}</h1>
                <h2>R$ {item[id - 1].price}</h2>
                <button>Buy</button>
                <button>Add to cart</button>
            </div>
        </div>
    )
}