import arrowIcon from "../assets/arrow.png"
import { useNavigate } from "react-router-dom"

export default function arrow() {

    const navigate = useNavigate();

    return(
        <>
            { window.innerWidth <= 414 
                ? 
                <div style={{display: "flex", gap: "1rem", alignItems: "center", paddingInline: "1rem", alignSelf:"flex-start"}}>
                    <img src={arrowIcon} alt="arrow" className="arrow-icon" onClick={() => navigate(-1)}/>
                </div>
                
                : null
            }
        </>
    )
}