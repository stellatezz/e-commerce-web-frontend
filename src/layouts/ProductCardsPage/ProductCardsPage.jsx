import React, { useEffect, useState } from 'react';
import ProductCards from "../../components/ProductCards/ProductCards";
import {getCategories} from '../../data'
import {Breadcrumb} from 'react-bootstrap'
import { useParams } from "react-router-dom";
import axios from 'axios';
import './style.css';

export default function ProductCardsPage() {
    let params = useParams();
    let selectedCatory;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCategory, setIsCategory] = useState(false);
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
      fetchProducts();
    },[])

    const fetchProducts = async () => {
      setLoading(true);
      setIsCategory(false);
      if (params.categoryId != null) {
        await axios.get(`http://localhost:8000/api/products/category/${params.categoryId}`).then(({data})=>{
            setProducts(data);
            setIsCategory(true);
        })
      } else {
        await axios.get(`http://localhost:8000/api/products`).then(({data})=>{
            setProducts(data)
        })
      }
      setLoading(false);
    }

    if (loading) {
      return (<span>loading</span>);
    }
    if (!products) {
      return (<span>data not available</span>);
    }
    if (isCategory) {
      selectedCatory = categories.find(category => category.catid == params.categoryId);
    }

    return (
        <div>
          {isCategory ? (
            <div className="breadContainer">
              <Breadcrumb>
                  <Breadcrumb.Item href="/home">
                      Home
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href={`/home/categories/${params.categoryId}`}>
                      {selectedCatory.name}
                  </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            ) : (
              <div className="breadContainer">
              <Breadcrumb>
                    <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            )}
            <ProductCards products={products}/>
        </div>
    );
};

