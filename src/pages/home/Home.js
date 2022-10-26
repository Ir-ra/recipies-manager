import RecipeList from '../../components/RecipeList.js';
import {useFetch} from '../../hooks/useFetch.js'
import './Home.css'

function Home() {
    const  { data: recipes, isPending, error } = useFetch('http://localhost:8000/recipes')
    
    return ( 
        <div className='home'>
            {isPending && <p className='loading'>Loading...</p>}
            {error &&  <p className='error'>{error}</p>}
            {recipes && <RecipeList recipes={recipes}/>}
        </div>
     );
}

export default Home;