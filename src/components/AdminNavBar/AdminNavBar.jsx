import { Navbar, Container } from 'react-bootstrap'

export default function AdminNavBar({ category }) {

    return (
        <div className='navContainer'>
            <Navbar bg="light">
            <Container>
                <Navbar.Brand href="/home">IERG4210 Shop</Navbar.Brand>
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