import { Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";  
import './style.css';

export default function ProductCard({ product }) {
    return (
        <div>
            <Card className='Card'>
                <Link to={`/home/products/${product.pid}`} key={product.pid}>
                    <Card.Img variant="top" src={`http://localhost:8000/storage/product/image/${product.image}`}/>
                </Link>
                <Card.Body>
                    <Link to={`/home/products/${product.pid}`} key={product.pid}>
                        <Card.Title>{product.name}</Card.Title>
                    </Link>
                    <Card.Text>
                        $ {product.price}
                    </Card.Text>
                    <Button variant="dark">Add to Cart</Button>
                </Card.Body>
            </Card>
        </div>
    )
}