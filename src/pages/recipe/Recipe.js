import { useEffect } from 'react';
import {useParams, useHistory} from 'react-router-dom'

import { useFetch } from '../../hooks/useFetch';
import './Recipe.css'

function Recipe() {
    const {id} = useParams()
    const url = 'http://localhost:8000/recipes/'+id
    const { data: recipE, isPending, error } = useFetch(url)
    const history = useHistory()

    useEffect(() => {
        if(error){
            setTimeout(()=>{
                history.push('/')
            }, 2000)
        }
    }, [error, history])

    return ( 
        <div className='recipe'>
           {isPending && <p className='loading'>Loading...</p>}
           {error &&  <p className='error'>{error}</p>} 
           {recipE && (
                <>
                    <h2 className='page-title'>{recipE.title}</h2>
                    <p>Takes {recipE.cookingTime} to cook.</p>
                    <ul>
                    {recipE.ingredients?.map(ing => 
                        <li key={ing}>{ing}</li>
                    )}
                    </ul>
                    
                    <p className='method'>{recipE.method}</p>
                </>
           )}

        </div>
     );
}

export default Recipe;