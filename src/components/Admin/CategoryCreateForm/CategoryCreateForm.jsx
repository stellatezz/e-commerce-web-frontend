import React, { useEffect, useState } from 'react';
import { Row, Container, Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate} from "react-router-dom";
import axios from 'axios';

export default function CategoryCreateForm() {
  const [Name, setName] = useState("");
  let navigate = useNavigate();


  let createCategory = async () => {
    const formData = new FormData();
    formData.append('name', Name);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/api/categories",
        data: formData,
        headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" },
      }).then(({data})=>{
          navigate("/admin/categories");
      });
    } catch(error) {
      //console.log(error)
    }
  };

  return (
      <div>
        <Container>
            <Row>
                <h3>Create category</h3>
            </Row>
          <Row>
        <Form>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={Name} onChange={(event)=>{
                  setName(event.target.value)
                }}/>
            </Form.Group>
            <Button variant="dark" onClick={createCategory}>Create</Button>
        </Form>
        </Row>
      </Container>
      </div>
  );
}
