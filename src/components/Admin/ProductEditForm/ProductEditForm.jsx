import React, { useEffect, useState } from 'react';
import { Row, Container, Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export default function ProductEditForm() {
  const [Image, setImage] = useState();
  const [Name, setName] = useState("");
  const [Catergory, setCatergory] = useState("");
  const [Price, setPrice] = useState("");
  const [Stock, setStock] = useState("");
  const [Description, setDescription] = useState("");
  const [categories, setCategories] = useState([])
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)
  let navigate = useNavigate();
  let params = useParams();

  useEffect(()=>{
      fetchProduct();
  },[])

  const fetchProduct = async () => {
        setLoading(true);
        await axios.get(`http://localhost:8000/api/products/${params.productId}`).then(({data})=>{
            setProduct(data);
            setCatergory(data[0].catid);
            setDescription(data[0].description);
            setStock(data[0].stock);
            setPrice(data[0].price);
            setName(data[0].name);
        })
        setLoading(false);
  }

  useEffect(()=>{
      fetchCategories();
  },[])

  const fetchCategories = async () => {
        setLoading(true);
        await axios.get(`http://localhost:8000/api/categories`).then(({data})=>{
            setCategories(data);
        })
        setLoading(false);
  }

  let saveProduct = async () => {
    const formData = new FormData();
    formData.append('name', Name);
    formData.append('catid', Catergory);
    formData.append('price', Price);
    formData.append('stock', Stock);
    formData.append('description', Description);

    if (Image != undefined) {
        formData.append('image', Image);
    }
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:8000/api/products/${params.productId}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" },
      }).then(({data})=>{
          navigate("/admin/products");
      });
      //console.log(response)
    } catch(error) {
      //console.log(error)
    }
  };

  let deleteProduct = async () => {
    try {
        const response = await axios({
          method: "delete",
          url: `http://localhost:8000/api/products/${params.productId}`,
          headers: { "Content-Type": "multipart/form-data", "Accept": "application/json" },
        }).then(({data})=>{
            navigate("/admin/products");
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
                <h3>Edit product</h3>
            </Row>
          <Row>
        <Form>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={Name} placeholder={product[0].name} onChange={(event)=>{
                  setName(event.target.value)
                }}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Catergory</Form.Label>
                <Form.Select value={Catergory} placeholder={product[0].catid} onChange={(event)=>{
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
                    <Form.Control type="number" value={Price} placeholder={product[0].price} onChange={(event)=>{
                      setPrice(event.target.value)
                    }}/>
                </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" value={Stock} placeholder={product[0].stock} onChange={(event)=>{
                  setStock(event.target.value)
                }}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} type="text" value={Description} placeholder={product[0].description} onChange={(event)=>{
                  setDescription(event.target.value)
                }}/>
            </Form.Group>
            <Form.Group controlId="Image" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" placeholder={product[0].image} onChange={(event)=>{
                  setImage(event.target.files[0]);
                }} />
            </Form.Group>
            <Button variant="dark" onClick={saveProduct}>Save</Button>
            <Button variant="red" onClick={deleteProduct}>Delete</Button>
        </Form>
        </Row>
      </Container>
      </div>
  );
}
