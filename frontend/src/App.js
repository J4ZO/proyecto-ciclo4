import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from "./screens/HomeScreens";
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <BrowserRouter> {/* Se establece que se trabajaran con rutas*/}
      <div >
        <header>
          <a href="/">Hola mundo</a> {/*Titulo de nuestro proyecto*/}
        </header>
        <main>
          <Routes>  {/*Etiquieta de las rutas*/}
            <Route path="/product/:slug" element={<ProductScreen />} /> {/* Muestra los detalles del objeto en la pagina correspondiente*/}
            <Route path="/" element={<HomeScreen />} /> {/*Trae el elemento de screens*/}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
