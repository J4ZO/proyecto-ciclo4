import data from "./data";

function App() {
  return (
    <div >
      <header>
        <a href="/">Hola mundo</a> {/*Titulo de nuestro proyecto*/}
      </header>
      <main>
        <h1>Productos Populares</h1>
        <div className="products"> {/*Contenedor de productos*/}
          {data.products.map((product) => (
            // Trae a los productos y le aplica lo siguiente a cada uno
            <div className="product" key={product.slug}>
              <a href={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name}></img>
              </a>
              <div className="info-product">
                <a href={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </a>
                <p><strong>{product.price}</strong></p>
                <button>Add to cart</button>
              </div>
            </div>

          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
