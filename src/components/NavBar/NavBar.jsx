import { Navbar, Container, Card, Popover, Button, Row, Col, Form } from 'react-bootstrap'
import './style.css'

export default function NavBar({ category }) {

    return (
        <div className='navContainer'>
            <Navbar bg="light">
            <Container>
                <Navbar.Brand href="/home">IERG4210 Shop</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <div className='ShoppingList'>
                            <p>Shopping List ($211.1)</p>
                            <div className='ShoppingList-hide'>
                                <Card>
                                    <Card.Body>
                                        <Container fluid>
                                            <Row> 
                                                <Col>
                                                    <div className='ShoppingList-title'>Shopping List (Total $211.1)</div>
                                                </Col>
                                            </Row>
                                            <Row> 
                                                <Col xs='6'>Hani Big Coat</Col>
                                                <Col><Form.Control type="text" placeholder="1"/></Col>
                                                <Col>$69.9</Col>
                                            </Row>
                                            <Row>
                                                <Col xs='6'>Nike Dunk Low</Col>
                                                <Col><Form.Control type="text" placeholder="1"/></Col>
                                                <Col>$69.0</Col>
                                            </Row>
                                            <Row> 
                                                <Col xs='6'>Chicago Hoodie</Col>
                                                <Col><Form.Control type="text" placeholder="1"/></Col>
                                                <Col>$72.2</Col>
                                            </Row>
                                            <div className='ShoppingList-checkout'>
                                                <Button variant="dark">Checkout</Button>
                                            </div>
                                        </Container>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    )
}