import { useNavigate } from "react-router-dom"
import { useContext   } from "react";
import { VariableContext } from "../context/variableContext"

export default function home() {

    const {items, createStars, searchFilter} = useContext(VariableContext)

    const navigate = useNavigate();

    let priceConverted = ""
    
    return(
        <> 
            { searchFilter == "" ? <div className="banner"></div> : null}
            <div className="home-products">
                { 
                    searchFilter == ""
                    ? items.map(x => {

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
                    
                    : searchFilter.map((x) => {
                        console.log(x)
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
                                        <h3 className="product-price">R$ {x.price}</h3>
                                    </div> 
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
