import { Link } from "react-router-dom";
import data from "../data";

function HomeScreen() {
    return <div>
        <h1>Productos Populares</h1>
        <div className="products"> {/*Contenedor de productos*/}
            {data.products.map((product) => (
                // Trae a los productos y le aplica lo siguiente a cada uno
                <div className="product" key={product.slug}>
                    <Link to={`/product/${product.slug}`}>
                        <img src={product.image} alt={product.name}></img>
                    </Link>
                    <div className="info-product">
                        <Link to={`/product/${product.slug}`}>
                            <p>{product.name}</p>
                        </Link>
                        <p><strong>{product.price}</strong></p>
                        <button>Add to cart</button>
                    </div>
                </div>

            ))}
        </div>
    </div>
}

export default HomeScreen;