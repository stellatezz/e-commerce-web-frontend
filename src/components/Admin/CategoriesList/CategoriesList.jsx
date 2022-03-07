import React, { useEffect, useState } from 'react';
import { ListGroup, Row, Col, Container, Button, Badge } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function CategoriesList() {
  const [categories, setCategories] = useState([])

  useEffect(()=>{
      fetchCategories() 
  },[])

  const fetchCategories = async () => {
      await axios.get(`http://localhost:8000/api/categories`).then(({data})=>{
        setCategories(data)
      })
  }
  
  return (
      <div>
        <Container>
        <Row>
          <Col sm={9}>Category</Col>
          <Col sm={3}>
            <Link to={`/admin/categories/create`}>
              Create new category
            </Link>
          </Col>
        </Row>
        <Row>
        <ListGroup as="ol" numbered>                
          {categories.map((category) => (
            <Link to={`/admin/categories/${category.catid}`} key={category.catid}>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{category.name}</div>
              </div>
            </ListGroup.Item>
          </Link>
          ))}
        </ListGroup>
        </Row>
      </Container>
      </div>
  );
}
