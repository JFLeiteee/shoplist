import { useParams, useNavigate } from "react-router-dom"
import { useContext } from "react";
import { VariableContext } from "../context/variableContext"

export default function filter() {
    const { category } = useParams();

    const navigate = useNavigate();

    const {items, createStars} = useContext(VariableContext)

    let filterList = []

    function applyFilter() {
        items.map((item) => {
            if(item.category.includes(category)){
                filterList.push( 
                    <div className="product-card" key={item.id}>
                        <div onClick={() => navigate(`/product/${item.id}`)} key={item.id} className="product">
                            <img src={item.photo} alt="imagem do produto" className="product-image"/>
                            <div className="about-product">      
                                <h4 className="product-name">{item.name}</h4>
                                <div className="review">
                                    { createStars(item.feedback) }
                                    <p className="product-feedback">{item.feedback}</p> 
                                </div>
                                <h3 className="product-price">R$ {item.price}</h3>
                            </div> 
                        </div>
                    </div>
                )
            } else {
                return
            }
        })
        return filterList
    }

    applyFilter()

    return(
        <div className="filter-page">
            { filterList }
        </div>
    )
}