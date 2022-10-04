import React, { useContext } from 'react';
import UserSideNav from '../../components/UserSideNav/UserSideNav'
import NavBar from '../../components/NavBar/NavBar';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet, Navigate } from "react-router-dom";
import { AuthStateContext } from "../../contexts/Auth";

export default function Home() {
  const { isLoggedIn } = useContext(AuthStateContext);
  function PrivateRoute() {
    //console.log(isLoggedIn);
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }
    return <div></div>;
  }
  return (
      <div>
        <PrivateRoute />
        <NavBar />
        <Container fluid>
          <Row>
          <Col xs={2}><UserSideNav /></Col>
          <Col xs={10}>
            <Outlet/>
          </Col>
          </Row>
        </Container>
      </div>
  );
}
