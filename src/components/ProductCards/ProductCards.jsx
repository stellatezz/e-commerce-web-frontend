import ProductCard from '../ProductCard/ProductCard'
import {CardGroup, Container} from 'react-bootstrap'
import { Outlet, useParams } from "react-router-dom";  

export default function ProductCards({products}) {
    let params = useParams();
    let filteredProducts = products;
    if (params.categoryId != null) {
        filteredProducts = products.filter(product => product.category === params.categoryId);
    }
    return (
        <div>
            <Container>
                <CardGroup>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </CardGroup>
            </Container>
            <Outlet />
        </div>
    )
};