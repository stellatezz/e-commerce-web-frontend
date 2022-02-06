import ProductCards from "../../components/ProductCards/ProductCards";
import {getCategories} from '../../data'
import {Breadcrumb} from 'react-bootstrap'
import { useParams } from "react-router-dom";
import './style.css';

export default function ProductCardsPage({products}) {
    let categories = getCategories();
    let params = useParams();
    let History = () => {
        return(
        <div className="breadContainer">
          <Breadcrumb>
                <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        );
      };
    
      if (params.categoryId != null) {
        let selectedCatory = categories.find(category => category.id == params.categoryId);
        History = () => {
          return(
            <div className="breadContainer">
                <Breadcrumb>
                    <Breadcrumb.Item href="/home">
                        Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href={`/categories/${selectedCatory.id}`}>
                        {selectedCatory.name}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
          );
        };
      }
    
    return (
        <div>
            <History />
            <ProductCards products={products}/>
        </div>
    );
};