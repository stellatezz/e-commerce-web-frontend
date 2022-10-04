import React, { useEffect, useState } from 'react';
import CategoryNav from '../../components/CategoryNav/CategoryNav'
import NavBar from '../../components/NavBar/NavBar';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from "react-router-dom";
import axios from 'axios';

export default function HomePage() {
  const [categories, setCategories] = useState([])

  useEffect(()=>{
      fetchCategories() 
  },[])

  const fetchCategories = async () => {
      await axios.get(`https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/categories`).then(({data})=>{
          setCategories(data);
      })
  }
  
  return (
      <div>
        <NavBar />
        <Container fluid>
          <Row>
          <Col xs={2}><CategoryNav categories={categories} /></Col>
          <Col xs={10}>
            <Outlet/>
          </Col>
          </Row>
        </Container>
      </div>
  );
}
