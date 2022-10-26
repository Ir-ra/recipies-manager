import { useLocation } from 'react-router-dom';
import RecipeList from '../../components/RecipeList';
import { useFetch } from '../../hooks/useFetch';
import './Search.css'

function Search() {
    //get a query parameter so we can get the query string by using useLocation
    const queryString = useLocation().search

    const queryParams = new URLSearchParams(queryString)
    const q = queryParams.get("q")
    //?q=mario

    //Next send request using useFetch hook so we can get any recipe that includes search param.
    const url = 'http://localhost:8000/recipes?q='+q
    //send the request for it url
    const {error, isPending, data} = useFetch(url)

    return ( 
        <div>
            <h2 className='page-title'>Recipes including "{q}"</h2>
            {isPending && <p className='loading'>Loading...</p>}
            {error &&  <p className='error'>{error}</p>} 
            {data && <RecipeList recipes={data}/>}
        </div>
     );
}

export default Search;