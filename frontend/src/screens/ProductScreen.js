import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { useContext } from 'react';
import { Store } from '../Store';


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


function ProductScreen() {
    const navigate = useNavigate(); // Se usa para navegar en otras paginas
    const params = useParams(); // Trae los parametros del elemento
    const { slug } = params; // Solo se selecciona el slug que unico

    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: '',
    });
    // const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/products/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) }); // Muestra el error de articulo no encontrado
            }

            // setProducts(result.data);
        };
        fetchData();
    }, [slug]);

    const { state, dispatch: ctxDispatch } = useContext(Store); // permite comunicar componentes funcionales a través del contexto en React.
    const { cart } = state;
    const addToCart = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1; // Si hay item lo aumenta en 1
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
            window.alert('Lo siento. Producto agotado');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM', // Se activa el caso del Store
            payload: { ...product, quantity }, // Aumenta uno al tener un nuevo objeto

        });
        navigate('/cart');
    };

    return loading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
            <Row>
                <Col md={6} className='img-container'>
                    <img
                        className="img-large"
                        src={product.image}
                        alt={product.name}
                        style={{ height: '70%' }}
                    ></img>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <Helmet>
                            <title>{product.name}</title> {/* Pone el nombre del articulo como el de la pagina*/}
                        </Helmet>
                        <ListGroup.Item>
                            <h1>{product.name}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                                rating={product.rating}
                            ></Rating>
                        </ListGroup.Item>
                        <ListGroup.Item>Precio : ${product.price}</ListGroup.Item>
                        <ListGroup.Item>
                            Disponible en: {product.consoleAvailable}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Precio:</Col>
                                        <Col>${product.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.inStock > 0 ? (
                                                <Badge bg="success">Disponible</Badge>
                                            ) : (
                                                <Badge bg="danger">Agotado</Badge>
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.inStock > 0 && (
                                    <ListGroup.Item>
                                        <div className="d-grid">
                                            <Button onClick={addToCart} variant="primary">Añadir al carro</Button>
                                        </div>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default ProductScreen;