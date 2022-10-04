import { Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";  
import React, {useContext } from "react";
import { CartDispatchContext, addCartItem } from "../../contexts/Cart";
import './style.css';

export default function ProductCard({ product }) {
    const dispatch = useContext(CartDispatchContext);

    function addCartHandler() {
        const item = { ...product, quantity: 1 };
        addCartItem(dispatch, item);
    }
    //console.log(product);
    return (
        <div>
            <Card className='Card'>
                <Link to={`/home/products/${product.pid}`} key={product.pid}>
                    <Card.Img variant="top" src={`https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/storage/product/thumbnail/${product.thumbnail}`}/>
                </Link>
                <Card.Body>
                    <Link to={`/home/products/${product.pid}`} key={product.pid}>
                        <Card.Title>{product.name}</Card.Title>
                    </Link>
                    <Card.Text>
                        $ {product.price}
                    </Card.Text>
                    <Button variant="dark" onClick={addCartHandler}>Add to Cart</Button>
                </Card.Body>
            </Card>
        </div>
    )
}