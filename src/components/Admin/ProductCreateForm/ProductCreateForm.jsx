import React, { useEffect, useState, useContext } from 'react';
import { Row, Container, Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate} from "react-router-dom";
import { AuthStateContext } from "../../../contexts/Auth";
import axios from 'axios';

export default function ProductCreateForm() {
  const { csrfNonce } = useContext(AuthStateContext);
  const [Image, setImage] = useState();
  const [Name, setName] = useState("");
  const [Catergory, setCatergory] = useState("");
  const [Price, setPrice] = useState("");
  const [Stock, setStock] = useState("");
  const [Description, setDescription] = useState("");
  const [Warning, setWarning] = useState("");
  const [ImagePreviewUrl, setImagePreviewUrl] = useState();

  let navigate = useNavigate();
  

  const [categories, setCategories] = useState([])

  useEffect(()=>{
      fetchCategories() 
  },[])

  function PerviewImage() {
    if (ImagePreviewUrl) {
      return (
        <div>
          Preview:
          <br/>
          <img className="previewImage" src={ImagePreviewUrl} alt="preview"/>
        </div>
      );
    }
    return <div></div>
  }

  const fetchCategories = async () => {
      await axios.get(`https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/categories`).then(({data})=>{
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
        withCredentials: true,
        url: "https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/products",
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
            <PerviewImage />
            {Warning}
            
            <Form.Group controlId="Image" className="mb-3">
                <Form.Label>Image (Drop or Select)</Form.Label>
                <div class="upload-container">
                  <Form.Control type="file" onChange={(event)=> {
                      if (event.target.files[0]['type'].split('/')[0] === 'image') {
                      setWarning("");
                      setImage(event.target.files[0]);
                      let reader = new FileReader();
                      reader.onload = function(e) {
                        setImagePreviewUrl(e.target.result);
                      };
                      reader.readAsDataURL(event.target.files[0]);
                    } else {
                      //event.target.files[0] = undefined;
                      setWarning("Only accept image, please upload again");
                    }
                    
                  }} />
                </div>
            </Form.Group>
            <Button variant="dark" onClick={createProduct}>Create</Button>
            <input type="hidden" name="csrf-nonce" value={csrfNonce}></input>
        </Form>
        </Row>
      </Container>
      </div>
  );
}
