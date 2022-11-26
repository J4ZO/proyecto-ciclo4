import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';



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
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }

            // setProducts(result.data);
        };
        fetchData();
    }, [slug]);

    return loading ? (
        <div>Cargando...</div>
    ) : error ? (
        <div>{error}</div>
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
                                            <Button variant="primary">Añadir al carro</Button>
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