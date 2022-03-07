import React, { useEffect, useState } from 'react';
import { ListGroup, Row, Col, Container, Button, Badge, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import './style.css';

export default function AdminProductPage() {
  const [products, setProducts] = useState([])

  useEffect(()=>{
      fetchProducts() 
  },[])

  const fetchProducts = async () => {
      await axios.get(`http://localhost:8000/api/products`).then(({data})=>{
          setProducts(data)
      })
  }
  
  return (
      <div>
        <Container>
        <Row>
          <Col sm={9}>Products</Col>
          <Col sm={3}>
            <Link to={`/admin/products/create`}>
              Create new product
            </Link>
          </Col>
        </Row>
        <Row>
        <ListGroup as="ol" numbered>                
          {products.map((product) => (
            <Link to={`/admin/products/${product.pid}`} key={product.pid}>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
              <div class="thumbnail">
                <Image src={`http://localhost:8000/storage/product/thumbnail/${product.thumbnail}`}/>
              </div>
              <div className="ms-2 me-auto">
                <div className="fw-bold">{product.name}</div>
                Price: {product.price}
              </div>
              <Badge variant="primary" pill>
                Stock: {product.stock}
              </Badge>
            </ListGroup.Item>
          </Link>
          ))}
        </ListGroup>
        </Row>
      </Container>
      </div>
  );
}
