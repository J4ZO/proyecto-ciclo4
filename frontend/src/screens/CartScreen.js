import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CartScreen() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store); // Hacemos uso del contexto de react
    const {
        cart: { cartItems }, // Vamos a listar los items
    } = state;

    const updateCart = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.inStock < quantity) {
            window.alert('Lo siento. Producto agotado');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
    };
    const removeItem = (item) => {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };

    const checkout = () => {
        navigate('/signin?redirect=/comprar');
    };

    return (
        <div>
            <Helmet>
                <title>Carrito de Compras</title>
            </Helmet>
            <h1>Carrito de Compras</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? ( // Compara si el carro esta vacio
                        <MessageBox>
                            Carrito esta vacío. <Link to="/">Vamos a Comprar</Link>
                        </MessageBox>
                    ) : (
                        <ListGroup>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item._id}>
                                    <Row className="align-items-center">
                                        <Col md={4} className='product-container'>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="img-fluid rounded img-thumbnail"
                                            ></img>{' '}
                                            <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={3}>
                                            <Button
                                                onClick={() =>
                                                    updateCart(item, item.quantity - 1) // Disminuye la cantidad
                                                }
                                                variant="light"
                                                disabled={item.quantity === 1}
                                            >
                                                <i className="fas fa-minus-circle"></i>
                                            </Button>{' '}
                                            <span>{item.quantity}</span>{' '}
                                            <Button
                                                variant="light"
                                                onClick={() =>
                                                    updateCart(item, item.quantity + 1) // Aumenta la cantidad
                                                }
                                                disabled={item.quantity === item.inStock}
                                            >
                                                <i className="fas fa-plus-circle"></i>
                                            </Button>
                                        </Col>
                                        <Col md={3}>${item.price}</Col>
                                        <Col md={2}>
                                            <Button
                                                onClick={() => removeItem(item)}
                                                variant="light"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '} {/* Sumas las cantidades del prodcuto */}
                                        items) : $
                                        {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)} {/* Multiplica la cantidad con el precio */}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button
                                            type="button"
                                            variant="primary"
                                            disabled={cartItems.length === 0}
                                            onClick={checkout}
                                        >
                                            Proceder a Pagar
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}