import { useParams } from "react-router-dom"

export default function product() {
    const { id } = useParams();

    return(
        <>
            <h1>product {id}</h1>
        </>
    )
}