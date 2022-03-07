import AdminSideNav from '../../components/AdminSideNav/AdminSideNav'
import AdminNavBar from '../../components/AdminNavBar/AdminNavBar';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
      <div>
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
