import { useNavigate } from "react-router-dom"
import { useContext   } from "react";
import { VariableContext } from "../context/variableContext"

export default function home() {

    const {items, searchResults, createStars} = useContext(VariableContext)

    const navigate = useNavigate();

    let priceConverted = ""
    
    return(
        <> 
            <div className="banner"></div>
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
