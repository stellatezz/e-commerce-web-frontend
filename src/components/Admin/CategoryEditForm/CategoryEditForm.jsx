import React, { useEffect, useState } from 'react';
import { Row, Container, Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export default function CategoryEditForm() {
  const [Name, setName] = useState("");
  const [catergory, setCatergory] = useState("");
  const [loading, setLoading] = useState(true)
  let navigate = useNavigate();
  let params = useParams();

  useEffect(()=>{
    fetchCategory();
  },[])

  const fetchCategory = async () => {
        setLoading(true);
        await axios.get(`http://localhost:8000/api/categories/${params.categoryId}`).then(({data})=>{
            setCatergory(data);
            setName(data[0].name);
        })
        setLoading(false);
  }

  let saveCategory = async () => {
    const formData = new FormData();
    formData.append('name', Name);

    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:8000/api/categories/${params.categoryId}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" },
      }).then(({data})=>{
          navigate("/admin/categories");
      });
      //console.log(response)
    } catch(error) {
      //console.log(error)
    }
  };

  let deleteCategory = async () => {
    try {
        const response = await axios({
          method: "delete",
          url: `http://localhost:8000/api/categories/${params.categoryId}`,
          headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" },
        }).then(({data})=>{
            navigate("/admin/categories");
        });
        //console.log(response)
      } catch(error) {
        //console.log(error)
      }
  };

  if (loading) {
      return (
          <span>loading</span>
      )
  }

  return (
      <div>
        <Container>
            <Row>
                <h3>Edit category</h3>
            </Row>
          <Row>
        <Form>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={Name} placeholder={catergory[0].name} onChange={(event)=>{
                  setName(event.target.value)
                }}/>
            </Form.Group>
            <Button variant="dark" onClick={saveCategory}>Save</Button>
            <Button variant="red" onClick={deleteCategory}>Delete</Button>
        </Form>
        </Row>
      </Container>
      </div>
  );
}
