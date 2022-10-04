import React, { useEffect, useState } from 'react';
import ProductCardsPage from './layouts/ProductCardsPage/ProductCardsPage'
import ProductPage from './layouts/ProductPage/ProductPage'
import AdminProductPage from './layouts/AdminProductPage/AdminProductPage'
import HomePage from './layouts/HomePage/HomePage'
import AdminPage from './layouts/AdminPage/AdminPage'
import UserPage from './layouts/UserPage/UserPage'
import AuthPage from './layouts/AuthPage/AuthPage'
import UserOrdersList from './components/UserOrdersList/UserOrdersList'
import ChangePasswordForm from './components/ChangePasswordForm/ChangePasswordForm'
import ProductCreateForm from './components/Admin/ProductCreateForm/ProductCreateForm'
import AdminOrdersList from './components/Admin/AdminOrdersList/AdminOrdersList'
import ProductEditForm from './components/Admin/ProductEditForm/ProductEditForm'
import CategoryCreateForm from './components/Admin/CategoryCreateForm/CategoryCreateForm'
import CategoryEditForm from './components/Admin/CategoryEditForm/CategoryEditForm'
import CategoriesList from './components/Admin/CategoriesList/CategoriesList'
import CartProvider from "./contexts/Cart";
import AuthProvider from "./contexts/Auth";
import {getProducts} from './data'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import axios from 'axios';

export default function App() {
  let products = getProducts();
  const [loading1, setLoading1] = useState(true);
  const [categories, setCategories] = useState([])


  useEffect(()=>{
        fetchData();
        //setSelectedCatory(categories.find(category => category.catid == product[0].catid));
    },[])
    const fetchData = async () => {
        setLoading1(true);
        await axios.get(`https://secure.s37.ierg4210.ie.cuhk.edu.hk:3000/api/categories`).then(({data})=>{
            setCategories(data);
            //setSelectedCatory(data.find(category => category.catid == product[0].catid));
        })
        setLoading1(false);
        //setSelectedCatory(categories.find(category => category.catid == product[0].catid));
    }

    if(loading1) {
        return (
        <span>Loading</span>
        );
      }

  return (
    <AuthProvider>
    <CartProvider>
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<HomePage/>}>
                <Route exact path="/home">
                    <Route index element={<ProductCardsPage categories={categories}/>} />
                    <Route path="products">
                      <Route path=":productId" element={<ProductPage categories={categories} />} />
                    </Route>
                    <Route path="categories" >
                     <Route path=":categoryId" element={<ProductCardsPage categories={categories} /> } />
                    </Route>
                </Route>
            </Route>
            <Route exact path="/admin" element={<AdminPage/>}>
                <Route index element={<AdminProductPage products={products} />} />
                <Route path="products">
                    <Route index element={<AdminProductPage />} />
                    <Route path=":productId" element={<ProductEditForm />} />
                    <Route path="create" element={<ProductCreateForm />} />
                </Route>
                <Route path="categories" >
                    <Route index element={<CategoriesList />} />
                    <Route path=":categoryId" element={<CategoryEditForm />} />
                    <Route path="create" element={<CategoryCreateForm />} />
                </Route>
                <Route path="orders" element={<AdminOrdersList />} />
            </Route>
            <Route exact path="/user" element={<UserPage/>}>
                <Route path="changepw" element={<ChangePasswordForm />}/>
                <Route path="orders" element={<UserOrdersList />}/>
            </Route>
            <Route exact path="/auth" element={<AuthPage/>}></Route>
            <Route
                exact path="*"
                element={
                <main>
                    <p>There's nothing here!</p>
                </main>
                }
            />
            
        </Routes>
    </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  );
}
