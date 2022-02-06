import { Container, Row, Col, Button } from 'react-bootstrap';
import './style.css';

export default function Product({product}) {
    return (
        <div>
            <Container>
            <Row>
                <Col xs={5}> 
                <div className='container'>
                    <img src={require(`../../assets/images/${product.image}`)} alt={product.image}/>
                </div>
                </Col>
                <Col xs={6}>
                    <div className="productDetail">
                        <div className="productDetail-upper">
                            <h2>{product.name}</h2>
                            <h3>$ {product.price}</h3>
                        </div>
                        <Button variant="dark">Add to Cart</Button>
                        <p className="productDetail-status">{product.status}</p>
                        <p>{product.description}</p>
                    </div>
                </Col>
            </Row>
            </Container>
        </div>
    );
};