import Product from "../../components/Product/Product";
import {getCategories, getProducts} from '../../data'
import {Breadcrumb} from 'react-bootstrap'
import { useParams } from "react-router-dom";

export default function ProductPage() {
    let categories = getCategories();
    let products = getProducts();
    let params = useParams();
    let selectedProduct;
    let selectedCatory;
    let History = () => {
        return(
          <div className="breadContainer">
            <Breadcrumb>
              <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        );
      };
      
    if (params.productId != null) {
      selectedProduct = products.find(product => product.id == params.productId);
      selectedCatory = categories.find(category => category.id == selectedProduct.category);
      History = () => {
        return(
          <div className="breadContainer">
            <Breadcrumb>
              <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
              <Breadcrumb.Item href={`/categories/${selectedCatory.id}`}>{selectedCatory.name}</Breadcrumb.Item>
              <Breadcrumb.Item href={`/products/${selectedProduct.id}`}>{selectedProduct.name}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        );
      };
    }
    
    return (
        <div>
            <History />
            <Product product={selectedProduct}/>
        </div>
    );
};