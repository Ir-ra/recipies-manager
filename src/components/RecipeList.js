import trashIcon from '../../src/assets/delete.svg'
import {Link} from 'react-router-dom'
import { useTheme } from '../hooks/useTheme';
import { projectFirestore } from '../../src/firebase/config'

//styles
import './RecipeList.css'

function RecipeList({recipes}) {
    
    const {mode} = useTheme()

    if(recipes.length === 0){
        return <div className='error'>No recipes to load...</div>
    }

    const handleClick = (id) => {
        projectFirestore.collection('recipe').doc(id).delete()
    }

    return ( 
        <div className='recipe-list'>
            {recipes.map(recipe => (
                <div key={recipe.id} className={`card ${mode}`}>
                <h2>{recipe.title.substring(0, 13)}</h2>
                <p>{recipe.cookingTime} to make.</p>
                <div>{recipe.method.substring(0, 100)}...</div>
                
                <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
                
                <img
                className='delete'
                onClick={() => handleClick(recipe.id)}
                src={trashIcon}
                alt='delete icon'
                />
            </div>
            ))}
        </div>
     );
}

export default RecipeList;  