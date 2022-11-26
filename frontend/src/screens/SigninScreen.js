import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';

export default function SigninScreen() {
    const { search } = useLocation(); // Retona un objeto de la actual url
    const redirectInUrl = new URLSearchParams(search).get('redirect'); // Obtiene la parte del redirect, en este caso /comprar
    const redirect = redirectInUrl ? redirectInUrl : '/'; // Si la url es correcta la retorna, si no, nos envia al inicio
    return (
        <Container className="small-container">
            <Helmet>
                <title>Iniciar sesión</title>
            </Helmet>
            <h1 className="my-3">Iniciar sesión</h1>
            <Form>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" required />
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Ingresar</Button>
                </div>
                <div className="mb-3">
                    Nuevo cliente?{' '}
                    <Link to={`/signup?redirect=${redirect}`}>Crea tu cuenta</Link>
                </div>
            </Form>
        </Container>
    );
}