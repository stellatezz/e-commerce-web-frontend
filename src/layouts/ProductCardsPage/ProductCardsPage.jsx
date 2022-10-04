import React, { useEffect, useState } from 'react';
import ProductCards from "../../components/ProductCards/ProductCards";
import {Breadcrumb, Pagination} from 'react-bootstrap'
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import './style.css';

export default function ProductCardsPage({categories}) {
    let params = useParams();
    //let selectedCatory;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCategory, setIsCategory] = useState(false);
    //const [categories, setCategories] = useState([]);
    const [activePage, setactivePage] = useState(1);
    const [pageItems, setpageItems] = useState([]);
    const [activeProducts, setactiveProducts] = useState([]);
    const upperProductNumber = 6;
    const [SelectedCatory, setSelectedCatory] = useState({name: ''});

    useEffect(()=>{
        //fetchCategories();
        fetchProducts();
    },[params.categoryId])

    // const fetchCategories = async () => {
    //     await axios.get(`https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/categories`).then(({data})=>{
    //         setCategories(data);
    //     })
    // }

    const fetchProducts = async () => {
      setLoading(true);
      setIsCategory(false);
      if (params.categoryId != null) {
        await axios.get(`https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/products/category/${params.categoryId}`).then(({data})=>{
            setProducts(data);
            setIsCategory(true);
            setPagination(data.length);
            setactiveProducts(data.slice(0,upperProductNumber));
            //console.log(categories);
            setSelectedCatory(categories.find(category => category.catid == params.categoryId));
        })
      } else {
        await axios.get(`https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/products`).then(({data})=>{
            setProducts(data);
            setPagination(data.length);
            setactiveProducts(data.slice(0,upperProductNumber));
        })
      }
      setLoading(false);
    }

    const changePageHandler = (number) => {
      setactivePage(number);
      //console.log(number);
      setactiveProducts(products.slice(upperProductNumber*(number-1),upperProductNumber*(number)));
    }

    const setPagination = (totalProduct) => {
      let tempTotalPage;
      tempTotalPage = totalProduct/6;
      if (totalProduct%6) tempTotalPage++;
      let tempPageItems = [];
      for (let number = 1; number <= tempTotalPage; number++) {
        tempPageItems.push(number);
      }
      setpageItems(tempPageItems);
    }    
    
    if (loading) {
      return (<span>loading</span>);
    }
    if (!products) {
      return (<span>data not available</span>);
    }
    

    return (
        <div>
          {isCategory ? (
            <div className="breadContainer">
              <Breadcrumb>         
                  <Breadcrumb.Item>
                    <Link to={`/home`}>
                      Home
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link to={`/home/categories/${params.categoryId}`}>
                      {SelectedCatory.name}
                    </Link>
                  </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            ) : (
              <div className="breadContainer">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to={`/home`}>
                    Home
                  </Link>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            )}
            <ProductCards products={activeProducts}/>
            <Pagination>
            {pageItems.map((_, index) => {
              return (
                <Pagination.Item
                  onClick={() => changePageHandler(index + 1)}
                  key={index + 1}
                  active={index + 1 === activePage}
                >
                  {index + 1}
                </Pagination.Item>
              );
            })}
            </Pagination>
        </div>
    );
};

