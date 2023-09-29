import { Link, useOutletContext, useNavigate } from "react-router-dom"

export default function favorites() {
    const [item, favoriteProducts, setFavoriteProducts] = useOutletContext()
    let favoriteList = []
    function listFavorites() {
        favoriteProducts.map(favorite => {
            if(favorite == true){
                for(let i = 0; i <= item.length; i++){
                    if(favoriteProducts.indexOf(favorite) == item[i].id - 1){
                        favoriteList.push(item[i].id)
                        return favoriteList
                    }
                }
            }
        })
    } 

    listFavorites()

    return(
        <div className="favorite-page">
            <h1>my favorites</h1>
            {
                favoriteList.map(x => {
                    return( 
                        <div>
                            <img src={item[x - 1].photo} className="product-image"/>
                            <h1>{item[x - 1].name}</h1>
                            <p>{item[x - 1].price}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}