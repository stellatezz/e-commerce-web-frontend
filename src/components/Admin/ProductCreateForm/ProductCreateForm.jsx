import React, { useEffect, useState } from 'react';
import { Row, Container, Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate} from "react-router-dom";
import axios from 'axios';

export default function ProductCreateForm() {
  const [Image, setImage] = useState();
  const [Name, setName] = useState("");
  const [Catergory, setCatergory] = useState("");
  const [Price, setPrice] = useState("");
  const [Stock, setStock] = useState("");
  const [Description, setDescription] = useState("");
  let navigate = useNavigate();

  const [categories, setCategories] = useState([])

  useEffect(()=>{
      fetchCategories() 
  },[])

  const fetchCategories = async () => {
      await axios.get(`http://localhost:8000/api/categories`).then(({data})=>{
          setCategories(data);
          setCatergory("1");
      })
  }

  let createProduct = async () => {
    const formData = new FormData();
    formData.append('name', Name);
    formData.append('catid', Catergory);
    formData.append('price', Price);
    formData.append('stock', Stock);
    formData.append('description', Description);
    formData.append('image', Image);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/api/products",
        data: formData,
        headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" },
      }).then(({data})=>{
          navigate("/admin/products");
      });
    } catch(error) {
      //console.log(error)
    }
  };

  return (
      <div>
        <Container>
          <Row>
        <Form>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={Name} onChange={(event)=>{
                  setName(event.target.value)
                }}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Catergory</Form.Label>
                <Form.Select value={Catergory} onChange={(event)=>{
                      setCatergory(event.target.value)
                    }}>
                    {categories.map((category) => (
                      <option value={category.catid} key={category.catid}>{category.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Price</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control type="number" value={Price} onChange={(event)=>{
                      setPrice(event.target.value)
                    }}/>
                </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" value={Stock} onChange={(event)=>{
                  setStock(event.target.value)
                }}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} type="text" value={Description} onChange={(event)=>{
                  setDescription(event.target.value)
                }}/>
            </Form.Group>
            <Form.Group controlId="Image" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={(event)=>{
                  setImage(event.target.files[0]);
                }} />
            </Form.Group>
            <Button variant="dark" onClick={createProduct}>Create</Button>
        </Form>
        </Row>
      </Container>
      </div>
  );
}
