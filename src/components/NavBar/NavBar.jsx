import React, { useState, useContext } from 'react';
import { Nav, Navbar, Container, Card, Button, Row, Col, Form } from 'react-bootstrap'
import CartList from '../CartList/CartList'
import './style.css'
import { AuthStateContext } from "../../contexts/Auth";
import { Link } from "react-router-dom";  

export default function NavBar({ category }) {

    return (
        <div className='navContainer'>
            <Navbar bg="light">
            <Container>
                <Link to="/home">
                    <div>
                        IERG4210 Shop
                    </div>
                </Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <CartList/>
                    </Navbar.Text>
                </Navbar.Collapse>

            </Container>
            </Navbar>
        </div>
    )
}