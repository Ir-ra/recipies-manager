import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SearchBar.css'

function SearchBar() {
    const [term, setTerm] = useState('')
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault() //prevent the default action of the page refreshing when submit the form
        
        history.push(`/search?q=${term}`)
    }

    return ( 
        <div className='searchbar'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='search'>Search:</label>
                <input
                type='text'
                id='search'
                onChange={(e) => setTerm(e.target.value)}
                required
                >
                </input>
            </form>
        </div>
     );
}

export default SearchBar;