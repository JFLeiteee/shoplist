import { useParams, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { VariableContext } from "../context/variableContext";


export default function searchPage() {
    
    const { searchFilter, createStars } = useContext(VariableContext) 
    const { search } = useParams();

    const [applySearch, setApplySearch] = useState([])
    const [otherSearch, setOtherSearch] = useState()


    const navigate = useNavigate();

    useEffect(() => {
        setApplySearch(searchFilter)
        setOtherSearch(search)
    }, [search])

    return (
        <div className="search-page">
            { 
                !applySearch.length == 0
                ?
                applySearch.map((product) => (
                    <div className="product-card" key={product.id}>
                        <div onClick={() => navigate(`/product/${product.id}`)} key={product.id} className="product">
                            <img src={product.photo} alt="imagem do produto" className="product-image"/>
                            <div className="about-product">
                                <h4 className="product-name">{product.name}</h4>
                                <div className="review">
                                    { createStars(product.feedback) }
                                    <p className="product-feedback">{product.feedback}</p> 
                                </div>
                                <h3 className="product-price">R$ {product.price}</h3>
                            </div> 
                        </div>
                    </div>
                ))

                : 
                <h1>No results for: "{otherSearch}"</h1>
            }
        </div>
    )
}