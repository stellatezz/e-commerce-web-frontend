import { Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";  
import './style.css';

export default function ProductCard({ product }) {
    return (
        <div>
            <Card className='Card'>
                <Link to={`/products/${product.id}`} key={product.id}>
                    <Card.Img variant="top" src={require(`../../assets/images/${product.image}`)}/>
                </Link>
                <Card.Body>
                    <Link to={`/products/${product.id}`} key={product.id}>
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