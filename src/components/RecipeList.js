
import {Link} from 'react-router-dom'

//styles
import './RecipeList.css'

function RecipeList({recipes}) {
    


    

    if(recipes.length === 0){
        return <div className='error'>No recipes to load...</div>
    }

    return ( 
        <div className='recipe-list'>
            {recipes.map(recipe => (
                <div key={recipe.id} className='card'>
                <h2>{recipe.title.substring(0, 13)}</h2>
                <p>{recipe.cookingTime} to make.</p>
                <div>{recipe.method.substring(0, 100)}...</div>
                
                <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
                
            </div>
            ))}
        </div>
     );
}

export default RecipeList;  