import { Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";  
import './style.css'

export default function CategoryNav({ categories, onSelectCategory }) {
    return (
        <div>
            <Nav className="flex-column">
                <Nav.Item>
                    <Link to="/home">
                        <div className='navItem'>
                            All
                        </div>
                    </Link>
                </Nav.Item>
                {categories.map((category) => (
                    <Nav.Item key={category.id}>
                        <Link to={`/categories/${category.id}`} key={category.id}>
                            <div className='navItem'>
                                {category.name.toString()}
                            </div>
                        </Link>
                    </Nav.Item>
                ))}
            </Nav>
        </div>
    )
}
