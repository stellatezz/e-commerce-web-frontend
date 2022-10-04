import React, { useEffect, useState } from 'react';
import Product from "../../components/Product/Product";
import {Breadcrumb} from 'react-bootstrap'
import { useParams, Link } from "react-router-dom";
import axios from 'axios';

export default function ProductPage({categories}) {
    let params = useParams();
    const [SelectedCatory, setSelectedCatory] = useState({name: ''});
    const [product, setProduct] = useState([{name: '', image: '', price: '', description: '', catid: '3', pid: '0'}]);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async () => {
      setLoading1(true);
      await axios.get(`https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/products/${params.productId}`).then(({data})=>{
          setProduct(data);
          setSelectedCatory(categories.find(category => category.catid == data[0].catid));
      })

      setLoading1(false);
    }

    if(loading1) {
      return (
      <span>Loading</span>
      );
    }

    if (!product) return (
      <span>Product not available</span>
    );

    return (
        <div>
            <div className="breadContainer">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to={`/home`}>
                    Home
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to={`/home/categories/${product[0].catid}`}>
                    {SelectedCatory.name}
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to={`/home/products/${product[0].pid}`}>
                    {product[0].name}
                  </Link>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Product product={product[0]}/>
        </div>
    );
};