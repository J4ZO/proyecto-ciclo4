import Spinner from 'react-bootstrap/Spinner';

export default function LoadingBox() {
    return (
        <Spinner animation="border" role="status"> {/* Muestra un circulo de carga animado */}
            <span className="visually-hidden">Cargando...</span>
        </Spinner>
    );
}