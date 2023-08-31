import { Link, useOutletContext } from "react-router-dom"

export default function home() {

    const item = useOutletContext();

    return(
        <> 
            <div className="home-products">
                {
                    item.map(x => 
                        <Link to={`product/${x.id}`} key={x.id} className="product-card">
                            <img src={x.photo} alt="imagem do produto" className="product-image"/> 
                            <h4 className="product-name">{x.name}</h4> 
                            <p className="product-feedback">{x.feedback}</p> 
                            <h3 className="product-price">R$ {x.price}</h3>
                        </Link>
                    )
                }
            </div>
        </>
    )
}