import React, { useState, useContext } from 'react';
import { Nav, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";  
import { AuthStateContext, AuthDispatchContext, logout } from "../../contexts/Auth";
import axios from 'axios';
import './style.css'

export default function CategoryNav({ categories, onSelectCategory }) {
    const { isLoggedIn, user, sessionId, isAdmin, csrfNonce } = useContext(AuthStateContext);
    const dispatch = useContext(AuthDispatchContext);

    let logoutHandler = async () => {
          const formData = new FormData();
          formData.append('sessionId', sessionId);
          formData.append('csrf_nonce', csrfNonce);
          formData.append('session', sessionId);

          try {
            const response = await axios({
              method: "post",
              url: "https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/auth/logout",
              withCredentials: true,
              data: formData,
              headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" },
            }).then(({data})=>{
                logout(dispatch);
            });
          } catch(error) {
          }
      };

    function AdminLink() {
        return (
        <Nav.Item>
            <Link to="/admin">
                <div className='navItem'>
                    Admin Panel
                </div>
            </Link>
        </Nav.Item>
        );
    }

    function UserGreeting() {
        return (
        <div>
            <Nav.Item>
                <div className='navItem'>
                    Welcome {user} !!
                </div>
            </Nav.Item>
            <Nav.Item>
                <Link to="/user">
                    <div className='navItem'>
                        Member Portal
                    </div>
                </Link>
            </Nav.Item>
            <Nav.Item>
                <div className='navItem' onClick={logoutHandler}>
                    logout
                </div>
            </Nav.Item>
        </div>
        );
    }
    
    function GuestGreeting() {
        return (
        <Nav.Item>
            <Link to="/auth">
                <div className='navItem'>
                    Hi Guest, Login
                </div>
            </Link>
        </Nav.Item>
        );
    }

    function Greeting() {
        //console.log(isLoggedIn);
        if (isLoggedIn&&isAdmin) {
            return (
                <div>
                    <AdminLink />
                    <UserGreeting />
                </div>
            )
        }
        if (isLoggedIn) {
            return <UserGreeting />;
        }
        return <GuestGreeting />;
    }

    return (
        <div>
            <Nav className="flex-column">
                <Greeting/>
                <Nav.Item>
                    <Link to="/home">
                        <div className='navItem'>
                            All
                        </div>
                    </Link>
                </Nav.Item>
                {categories.map((category) => (
                    <Nav.Item key={category.catid}>
                        <Link to={`/home/categories/${category.catid}`} key={category.catid}>
                            <div className='navItem'>
                                {category.name.toString()}
                            </div>
                        </Link>
                    </Nav.Item>
                ))}
            </Nav>
        </div>
    )
}
