import CategoryNav from './components/CategoryNav/CategoryNav'
import NavBar from './components/NavBar/NavBar';
import ProductCardsPage from './layouts/ProductCardsPage/ProductCardsPage'
import ProductPage from './layouts/ProductPage/ProductPage'
import {getProducts, getCategories} from './data'
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Home() {
  let products = getProducts();
  let categories = getCategories();

  return (
    <BrowserRouter>
      <div>
        <NavBar />
        checkout
        hi
        <Container fluid>
          <Row>
          <Col xs={2}><CategoryNav categories={categories} /></Col>
          <Col xs={10}>
            <Routes>
              <Route exact path="/" >
                <Route exact path="/home" element={<ProductCardsPage products={products} />}/>
                <Route exact path="/products">
                  <Route exact path=":productId" element={<ProductPage />} />
                </Route>
                <Route exact path="/categories" >
                  <Route exact path=":categoryId" element={<ProductCardsPage products={products}/>} />
                </Route>
                <Route
                  exact path="*"
                  element={
                    <main>
                      <p>There's nothing here!</p>
                    </main>
                  }
                />
              </Route>
            </Routes>
          </Col>
          </Row>
        </Container>
      </div>
    </BrowserRouter>
  );
}
