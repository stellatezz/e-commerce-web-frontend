import { Container, Row, Col, Button } from 'react-bootstrap';
import React, {useContext } from "react";
import { CartDispatchContext, addCartItem } from "../../contexts/Cart";
import './style.css';

export default function Product({product}) {
    const dispatch = useContext(CartDispatchContext);

    function addCartHandler() {
        const item = { ...product, quantity: 1 };
        addCartItem(dispatch, item);
    }

    let status;
    if (product.stock == 0) {
        status = "Out of Stock";
    } else {
        status = "In Stock";
    }

    return (
        <div>
            <Container>
            <Row>
                <Col xs={5}> 
                <div className='container'>
                    <img src={`https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/storage/product/image/${product.image}`} alt={product.image}/>
                </div>
                </Col>
                <Col xs={6}>
                    <div className="productDetail">
                        <div className="productDetail-upper">
                            <h2>{product.name}</h2>
                            <h3>$ {product.price}</h3>
                        </div>
                        <Button variant="dark" onClick={addCartHandler}>Add to Cart</Button>
                        <p className="productDetail-status">{status}</p>
                        <p>{product.description}</p>
                    </div>
                </Col>
            </Row>
            </Container>
        </div>
    );
};