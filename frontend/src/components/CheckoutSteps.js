import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CheckoutSteps(props) {
    return (
        <Row className="checkout-steps">
            <Col className={props.step1 ? 'active' : ''}>Sign-In</Col>
            <Col className={props.step2 ? 'active' : ''}>Compra</Col>
            <Col className={props.step3 ? 'active' : ''}>Metodo de pago</Col>
            <Col className={props.step4 ? 'active' : ''}>Pedido</Col>
        </Row>
    );
}