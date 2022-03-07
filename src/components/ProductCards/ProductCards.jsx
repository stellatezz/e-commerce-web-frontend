import ProductCard from '../ProductCard/ProductCard'
import {CardGroup, Container} from 'react-bootstrap'
import { Outlet } from "react-router-dom";  

export default function ProductCards({products}) {
    return (
        <div>
            <Container>
                <CardGroup>
                    {products.map((product) => (
                        <ProductCard key={product.pid} product={product}/>
                    ))}
                </CardGroup>
            </Container>
            <Outlet />
        </div>
    )
};