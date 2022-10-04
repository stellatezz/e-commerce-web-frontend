import React, { useState, useContext } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Outlet } from "react-router-dom";
import { useNavigate, Navigate} from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthStateContext, AuthDispatchContext, login, loadcsrf } from "../../contexts/Auth";

export default function AuthPage() {
  const { isLoggedIn, csrfNonce } = useContext(AuthStateContext);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Warring, setWarring] = useState("");
  let navigate = useNavigate();
  const dispatch = useContext(AuthDispatchContext);

  function PrivateRoute() {
    //console.log(isLoggedIn);
    if (isLoggedIn) {
        return <Navigate to="/" />;
    }
    return <div></div>;
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  let LoginHandler = async () => {
    if (validateEmail(Email) && Email !== "" && Password !== "") {
      const formData = new FormData();
      formData.append('email', Email);
      formData.append('password', Password);
      try {
        const response = await axios({
          method: "post",
          url: "https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/auth/login",
          withCredentials: true,
          data: formData,
          headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" },
        }).then(({data})=>{
            if (data.status === '-1'||data.status === '-2') {
              let leftchance = data.leftchance;
              setWarring("Wrong password or email, left "+leftchance+" times chance to try");
            }
            if (data.status === '-9') {
              setWarring("Tried too much times, please contact 1155136168@link.cuhk.edu.hk for unblocking.");
            }
            if (data.status === '1') {
              let username = data.username;
              let uid = data.uid;
              let flag = data.flag;
              let csrf = data.csrf_nonce;
              // let authData = Cookies.get('auth');
              // let newAuthData = authData.replaceAll("'", '"');
              // let auth = JSON.parse(newAuthData);
              login(dispatch, username, uid, flag);
              loadcsrf(dispatch, csrf);
              
              if (flag === 1) {
                navigate("/admin");
              } else {
                navigate("/home");
              }
            }
        });
      } catch(error) {
      }
    }
  };
  
  return (
      <div>
        <Container fluid>
          <Row></Row>
          <Row xs={8}>
          <Col></Col>
          <Col xs={6}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(event)=>{
                      setEmail(event.target.value)
                    }}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(event)=>{
                      setPassword(event.target.value)
                    }}/>
                </Form.Group>

                <input type="hidden" name="csrf-nonce" value={csrfNonce}></input>
                
                <Button variant="dark" onClick={LoginHandler}>
                    Login
                </Button>
                <p>{Warring}</p>
              </Form>
          </Col>
          <Col></Col>
          </Row>
        </Container>
      </div>
  );
}
