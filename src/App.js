import ProductCardsPage from './layouts/ProductCardsPage/ProductCardsPage'
import ProductPage from './layouts/ProductPage/ProductPage'
import AdminProductPage from './layouts/AdminProductPage/AdminProductPage'
import HomePage from './layouts/HomePage/HomePage'
import AdminPage from './layouts/AdminPage/AdminPage'
import ProductCreateForm from './components/Admin/ProductCreateForm/ProductCreateForm'
import ProductEditForm from './components/Admin/ProductEditForm/ProductEditForm'
import CategoryCreateForm from './components/Admin/CategoryCreateForm/CategoryCreateForm'
import CategoryEditForm from './components/Admin/CategoryEditForm/CategoryEditForm'
import CategoriesList from './components/Admin/CategoriesList/CategoriesList'
import {getProducts} from './data'
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  let products = getProducts();

  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" >
                <Route exact path="/home" element={<HomePage/>}>
                    <Route index element={<ProductCardsPage />} />
                    <Route path="products">
                      <Route path=":productId" element={<ProductPage />} />
                    </Route>
                    <Route path="categories" >
                     <Route path=":categoryId" element={<ProductCardsPage /> } />
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
                </Route>
                <Route
                    exact path="*"
                    element={
                    <main>
                        <p>There's nothing here!</p>
                    </main>
                    }
                />
            </Route>
        </Routes>
    </BrowserRouter>
  );
}
