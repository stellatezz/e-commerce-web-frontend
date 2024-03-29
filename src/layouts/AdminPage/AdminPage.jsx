import React, { useContext } from 'react';
import AdminSideNav from '../../components/AdminSideNav/AdminSideNav'
import AdminNavBar from '../../components/AdminNavBar/AdminNavBar';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet, Navigate } from "react-router-dom";
import { AuthStateContext } from "../../contexts/Auth";

export default function Home() {
  const { isLoggedIn, isAdmin } = useContext(AuthStateContext);
  function PrivateRoute() {
    //console.log(isLoggedIn);
    if (!isAdmin) {
        return <Navigate to="/" />;
    }
    return <div></div>;
  }
  return (
      <div>
        <PrivateRoute />
        <AdminNavBar />
        <Container fluid>
          <Row>
          <Col xs={2}><AdminSideNav /></Col>
          <Col xs={10}>
            <Outlet/>
          </Col>
          </Row>
        </Container>
      </div>
  );
}
