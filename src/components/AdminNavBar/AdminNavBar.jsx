import { Navbar, Container } from 'react-bootstrap'
import { Link } from "react-router-dom";  

export default function AdminNavBar({ category }) {

    return (
        <div className='navContainer'>
            <Navbar bg="light">
            <Container>
                <Link to="/home">
                    <div>
                        IERG4210 Shop
                    </div>
                </Link>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Hello Admin
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    )
}