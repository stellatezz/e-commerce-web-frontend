import React, { useEffect, useState, useContext } from 'react';
import { ListGroup, Row, Col, Container, Button, Badge } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import { AuthStateContext } from "../../contexts/Auth";

export default function UserOrdersList() {
  const [categories, setCategories] = useState([])
  const { user, userID  } = useContext(AuthStateContext);
  const [orders, setOrders] = useState([])

  useEffect(()=>{
    fetchOrders() 
  },[])

  const fetchOrders = async () => {
    const formData = new FormData();
    formData.append('username', user);
    formData.append('uid', userID);

    try {
      await axios({
        method: "post",
        withCredentials: true,
        url: "https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/order/userorder",
        data: formData,
        headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" },
      }).then(({data})=>{
          //console.log(data.orders)
          let temporders = data.orders.map((order) => {
            let products = JSON.parse(order.products);
            //console.log(products);
            return (
                {
                    payment_status: order.payment_status,
                    total_price: order.total_price,
                    uid: order.uid,
                    username: order.username,
                    uuid: order.uuid,
                    products: products,
                }
            )
          })
          console.log(temporders);
          setOrders(temporders);
      });
    } catch(error) {
      //console.log(error)
    }
  }
  
  return (
      <div>
        <Container>
        <Row>
          <Col sm={9}>Most recent orders</Col>
        </Row>
        <Row>
        <ListGroup as="ol" numbered>                
          {orders.map((order) => (
              <ListGroup.Item
                className="d-flex justify-content-between align-items-start"
              >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Invoice ID: {order.uuid}</div>
                <div>username: {order.username}</div>
                {order.products.map((product) => (
                    <div>
                        <div>product: {product.name} quantity: {product.quantity} price: {product.price}</div>
                    </div>
                ))}
                <div className="fw-bold">Total Price: {order.total_price}</div>
              </div>
              
                <Badge bg="primary" pill>
                Status: {order.payment_status}
                </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
        </Row>
      </Container>
      </div>
  );
}
