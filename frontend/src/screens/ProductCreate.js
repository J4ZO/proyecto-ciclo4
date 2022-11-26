import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import { useContext, useEffect, useReducer, useState } from 'react';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'CREATE_REQUEST':
            return { ...state, loadingCreate: true };
        case 'CREATE_SUCCESS':
            return {
                ...state,
                loadingCreate: false,
            };
        case 'CREATE_FAIL':
            return { ...state, loadingCreate: false };
        default:
            return state;
    }
};
export default function ProductCreate() {

    const [{ loading, error, products, pages, loadingCreate }, dispatch] =
        useReducer(reducer, {
            loading: true,
            error: '',
        });

    const [name, setName] = useState('');
    const [classification, setclassification] = useState('');
    const [inStock, setinStock] = useState('');
    const [consoleAvailable, setconsoleAvailable] = useState('');
    const [image, setimage] = useState('');
    const [price, setprice] = useState('');
    const [rating, setrating] = useState('');
    const [mode, setmode] = useState('');
    const [slug, setslug] = useState('');

    const navigate = useNavigate();
    // const { search } = useLocation();

    // const redirectInUrl = new URLSearchParams(search).get('redirect');
    // const redirect = redirectInUrl ? redirectInUrl : '/';



    const { state } = useContext(Store);
    // const { userInfo } = state;

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const { data } = await Axios.get(`/api/products/${page} `, {
    //                 headers: { Authorization: `Bearer ${userInfo.token}` },
    //             });
    //             dispatch({ type: 'FETCH_SUCCESS', payload: data });
    //         } catch (err) { }
    //     };
    //     fetchData();
    // }, [page, userInfo]);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post('/api/products/newproducts', {
                name,
                classification,
                inStock,
                consoleAvailable,
                image,
                price,
                rating,
                mode,
                slug,
            });
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
        } catch (err) {
            toast.error(getError(err));
        }
        navigate('/');
    };



    // const create = async () => {
    //     if (window.confirm('Are you sure to create?')) {
    //         try {
    //             dispatch({ type: 'CREATE_REQUEST' });
    //             const { data } = await Axios.post(
    //                 '/api/products',
    //                 {},
    //                 {
    //                     headers: { Authorization: `Bearer ${userInfo.token}` },
    //                 }
    //             );
    //             toast.success('product created successfully');
    //             dispatch({ type: 'CREATE_SUCCESS' });
    //             navigate(`/product/${data.product._id}`);
    //         } catch (err) {
    //             toast.error(getError(error));
    //             dispatch({
    //                 type: 'CREATE_FAIL',
    //             });
    //         }
    //     }
    // };
    return (
        <Container className="small-container">
            <Helmet>
                <title>Nuevo producto</title>
            </Helmet>
            <h1>Nuevo producto</h1>
            <Form onSubmit={submit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Juego</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder='Nombre Juego'
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="classification">
                    <Form.Label>Clasificacion</Form.Label>
                    <Form.Control
                        value={classification}
                        onChange={(e) => setclassification(e.target.value)}
                        required
                        placeholder='ESRB18'
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="inStock">
                    <Form.Label>En stock</Form.Label>
                    <Form.Control
                        value={inStock}
                        onChange={(e) => setinStock(e.target.value)}
                        required
                        placeholder='Cantidad'
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="consoleAvailable">
                    <Form.Label>Disponibilidad</Form.Label>
                    <Form.Control
                        value={consoleAvailable}
                        onChange={(e) => setconsoleAvailable(e.target.value)}
                        required
                        placeholder='XBOX, PlayStaion, PC'
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image File</Form.Label>
                    <Form.Control
                        value={image}
                        onChange={(e) => setimage(e.target.value)}
                        required
                        placeholder='Url imagen'
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        value={price}
                        onChange={(e) => setprice(e.target.value)}
                        required
                        placeholder='10000000'
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                        value={rating}
                        onChange={(e) => setrating(e.target.value)}
                        required
                        placeholder='4.5'
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="mode">
                    <Form.Label>Modo</Form.Label>
                    <Form.Control
                        value={mode}
                        onChange={(e) => setmode(e.target.value)}
                        required
                        placeholder='Single-Player, Multiplayer'
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="slug">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        value={slug}
                        onChange={(e) => setslug(e.target.value)}
                        required
                        placeholder='nombre-juego'
                    />
                </Form.Group>

                <div className="mb-3">
                    <Button type="submit" >Update</Button>
                </div>
            </Form>
        </Container>
    );
}