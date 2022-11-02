import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
// import { useContext } from 'react';
import './Navbar.css'
import SearchBar from './SearchBar';


function Navbar() {
    //тут використовуємо useContext
            // const {color} = useContext(ThemeContext)
    const {color} = useTheme()

    return (
        <div className='navbar' style={{background: color}}>
            <nav>
                <Link to='/' className='brand'>
                    <h1>Cook Pad</h1>
                </Link>
                <SearchBar/>
                <Link to='/create'>Create Recipe</Link>
            
                
            </nav>
            
        </div>
    );
}

export default Navbar;