import React, { useEffect, useState, useContext } from 'react';
import { Row, Container, Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { AuthStateContext } from "../../../contexts/Auth";
import axios from 'axios';

export default function ProductEditForm() {
  const { csrfNonce } = useContext(AuthStateContext);
  const [Image, setImage] = useState();
  const [Name, setName] = useState("");
  const [Catergory, setCatergory] = useState("");
  const [Price, setPrice] = useState("");
  const [Stock, setStock] = useState("");
  const [Description, setDescription] = useState("");
  const [categories, setCategories] = useState([])
  const [product, setProduct] = useState([{name:'', catid:'', price:'', stock: '', image: ''}])
  const [loading, setLoading] = useState(true)
  let navigate = useNavigate();
  let params = useParams();
  const [ImagePreviewUrl, setImagePreviewUrl] = useState();
  const [Warning, setWarning] = useState("");

  useEffect(()=>{
      fetchCategories();
      fetchProduct();
  },[])

  const fetchProduct = async () => {
    setLoading(true);
    await axios.get(`https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/products/${params.productId}`).then(({data})=>{
        setProduct(data);
        setCatergory(data[0].catid);
        setDescription(data[0].description);
        setStock(data[0].stock);
        setPrice(data[0].price);
        setName(data[0].name);
    })
    setLoading(false);
}

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
        setLoading(true);
        await axios.get(`https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/categories`).then(({data})=>{
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
      await axios({
        method: "post",
        withCredentials: true,
        url: `https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/products/${params.productId}`,
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
        await axios({
          method: "post",
          withCredentials: true,
          url: `https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/products/delete/${params.productId}`,
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
            <PerviewImage />
            {Warning}
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
            <Button variant="dark" onClick={saveProduct}>Save</Button>
            <Button variant="red" onClick={deleteProduct}>Delete</Button>
            <input type="hidden" name="csrf-nonce" value={csrfNonce}></input>
        </Form>
        </Row>
      </Container>
      </div>
  );
}
