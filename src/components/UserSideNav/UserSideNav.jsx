import { Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";  

export default function UserSideNav() {
    return (
        <div>
            <Nav className="flex-column">
                <Nav.Item>
                    <Link to="/home">
                        <div className='navItem'>
                            Shop Home
                        </div>
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/user/orders">
                        <div className='navItem'>
                            View Orders
                        </div>
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/user/changepw">
                        <div className='navItem'>
                            Change Password
                        </div>
                    </Link>
                </Nav.Item>
                {/* <Nav.Item >
                    <Link to={`/admin/products`}>
                        <div className='navItem'>
                            Logout
                        </div>
                    </Link>
                </Nav.Item> */}
            </Nav>
        </div>
    )
}
