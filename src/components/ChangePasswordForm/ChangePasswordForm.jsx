import React, { useState, useContext } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Outlet } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthStateContext, AuthDispatchContext, logout } from "../../contexts/Auth";

export default function ChangePasswordForm() {
  const { sessionID, userID, csrfNonce } = useContext(AuthStateContext);
  const [OldPassword, setOldPassword] = useState("");
  const [Password, setPassword] = useState("");
  const [Warring, setWarring] = useState("");
  const dispatch = useContext(AuthDispatchContext);

  let SubmitHandler = async () => {
      const formData = new FormData();
      formData.append('password', OldPassword);
      formData.append('newPassword', Password);
      formData.append('sessionId', sessionID);
      formData.append('uid', userID);
      formData.append('csrf_nonce', csrfNonce);
      formData.append('session', sessionID);

      try {
        const response = await axios({
          method: "post",
          url: "https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/user/modify/pw",
          withCredentials: true,
          data: formData,
          headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" },
        }).then(({data})=>{
            if (data.status === '-2') {
              setWarring("Wrong password");
            }
            if (data.status === '2') {
              logout(dispatch);
            }
        });
      } catch(error) {
      }
  };
  
  return (
      <div>
        <Container fluid>
              <h4>Change Password</h4>
              <Form>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter old password" onChange={(event)=>{
                      setOldPassword(event.target.value)
                    }}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(event)=>{
                      setPassword(event.target.value)
                    }}/>
                </Form.Group>
                
                <Button variant="dark" onClick={SubmitHandler}>
                    Submit
                </Button>
                <p>{Warring}</p>
                <input type="hidden" name="csrf-nonce" value={csrfNonce}></input>
              </Form>

        </Container>
      </div>
  );
}
