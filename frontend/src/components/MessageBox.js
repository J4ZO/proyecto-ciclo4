import Alert from 'react-bootstrap/Alert';

export default function MessageBox(props) {
    return <Alert variant={props.variant || 'info'}>{props.children}</Alert>; // Muestra un mensaje segun la situacion
}