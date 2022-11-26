import { useParams } from "react-router-dom";

function ProductScreen() {
    const params = useParams(); // Trae los parametros del elemento
    const { slug } = params; // Solo se selecciona el slug que unico
    return (
        <div>
            <h1>{slug}</h1>

        </div>
    )
}

export default ProductScreen;