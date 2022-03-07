import React, { useEffect, useState } from 'react';
import Product from "../../components/Product/Product";
import {Breadcrumb} from 'react-bootstrap'
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function ProductPage() {
    let params = useParams();
    let selectedCatory;
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([])

    useEffect(()=>{
        fetchCategories() 
    },[])

    const fetchCategories = async () => {
        await axios.get(`http://localhost:8000/api/categories`).then(({data})=>{
            setCategories(data);
        })
    }

    useEffect(()=>{
      fetchProducts() 
    },[])

    const fetchProducts = async () => {
      setLoading(true);
      await axios.get(`http://localhost:8000/api/products/${params.productId}`).then(({data})=>{
          setProduct(data);
          
      })
      setLoading(false);
    }

    if(loading) return (
      <span>Loading</span>
    );
    if (!product) return (
      <span>Product not available</span>
    );
    selectedCatory = categories.find(category => category.catid == product[0].catid);

    return (
        <div>
            <div className="breadContainer">
              <Breadcrumb>
                <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
                <Breadcrumb.Item href={`/home/categories/${product[0].catid}`}>{selectedCatory.name}</Breadcrumb.Item>
                <Breadcrumb.Item href={`/home/products/${product[0].pid}`}>{product[0].name}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Product product={product[0]}/>
        </div>
    );
};