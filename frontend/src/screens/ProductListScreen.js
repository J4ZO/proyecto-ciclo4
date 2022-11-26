// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Store } from '../Store';
// import { getError } from '../utils';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import { Helmet } from 'react-helmet-async';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
// import Button from 'react-bootstrap/Button';
// import { useContext, useReducer, useState } from 'react';

// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'FETCH_REQUEST':
//             return { ...state, loading: true };
//         case 'FETCH_SUCCESS':
//             return { ...state, loading: false };
//         case 'FETCH_FAIL':
//             return { ...state, loading: false, error: action.payload };
//         default:
//             return state;
//     }
// };
// export default function ProductEditScreen() {
//     const params = useParams(); // /product/:id
//     const { id: productId } = params;

//     const { state } = useContext(Store);
//     const { userInfo } = state;
//     const [{ loading, error }, dispatch] = useReducer(reducer, {
//         loading: true,
//         error: '',
//     });

//     const [name, setName] = useState('');
//     const [classification, setclassification] = useState('');
//     const [inStock, setinStock] = useState('');
//     const [consoleAvailable, setconsoleAvailable] = useState('');
//     const [image, setimage] = useState('');
//     const [price, setprice] = useState('');
//     const [rating, setrating] = useState('');
//     const [mode, setmode] = useState('');
//     const [slug, setslug] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 dispatch({ type: 'FETCH_REQUEST' });
//                 const { data } = await axios.get(`/api/products/${productId}`);
//                 setName(data.name);
//                 setclassification(data.classification);
//                 setinStock(data.inStock);
//                 setconsoleAvailable(data.consoleAvailable);
//                 setimage(data.image);
//                 setprice(data.price);
//                 setrating(data.rating);
//                 setmode(data.mode);
//                 setslug(data.slug);
//                 dispatch({ type: 'FETCH_SUCCESS' });
//             } catch (err) {
//                 dispatch({
//                     type: 'FETCH_FAIL',
//                     payload: getError(err),
//                 });
//             }
//         };
//         fetchData();
//     }, [productId]);

//     return (
//         <Container className="small-container">
//             <Helmet>
//                 <title>Edit Product ${productId}</title>
//             </Helmet>
//             <h1>Edit Product {productId}</h1>

//             {loading ? (
//                 <LoadingBox></LoadingBox>
//             ) : error ? (
//                 <MessageBox variant="danger">{error}</MessageBox>
//             ) : (
//                 <Form>
//                     <Form.Group className="mb-3" controlId="name">
//                         <Form.Label>Name</Form.Label>
//                         <Form.Control
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="classification">
//                         <Form.Label>Clasificacion</Form.Label>
//                         <Form.Control
//                             value={classification}
//                             onChange={(e) => setclassification(e.target.value)}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="inStock">
//                         <Form.Label>En stock</Form.Label>
//                         <Form.Control
//                             value={inStock}
//                             onChange={(e) => setinStock(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
                    
//                     <Form.Group className="mb-3" controlId="consoleAvailable">
//                         <Form.Label>Disponibilidad</Form.Label>
//                         <Form.Control
//                             value={consoleAvailable}
//                             onChange={(e) => setconsoleAvailable(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="image">
//                         <Form.Label>Image File</Form.Label>
//                         <Form.Control
//                             value={image}
//                             onChange={(e) => setimage(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="price">
//                         <Form.Label>Precio</Form.Label>
//                         <Form.Control
//                             value={price}
//                             onChange={(e) => setprice(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="rating">
//                         <Form.Label>Rating</Form.Label>
//                         <Form.Control
//                             value={rating}
//                             onChange={(e) => setrating(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="mode">
//                         <Form.Label>Modo</Form.Label>
//                         <Form.Control
//                             value={mode}
//                             onChange={(e) => setmode(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="slug">
//                         <Form.Label>Slug</Form.Label>
//                         <Form.Control
//                             value={slug}
//                             onChange={(e) => setslug(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
            
//                     <div className="mb-3">
//                         <Button type="submit">Update</Button>
//                     </div>
//                 </Form>
//             )}
//         </Container>
//     );
// }