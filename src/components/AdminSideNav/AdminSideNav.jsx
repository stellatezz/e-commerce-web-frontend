import { Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";  

export default function AdminSideNav() {
    return (
        <div>
            <Nav className="flex-column">
                <Nav.Item>
                    <Link to="/admin">
                        <div className='navItem'>
                            Main
                        </div>
                    </Link>
                </Nav.Item>
                <Nav.Item >
                    <Link to={`/admin/products`}>
                        <div className='navItem'>
                            Manage Product
                        </div>
                    </Link>
                    <Link to={`/admin/categories`}>
                        <div className='navItem'>
                            Manage Category
                        </div>
                    </Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}
