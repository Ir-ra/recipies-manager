import { useEffect, useState } from 'react';
import {useParams, useHistory} from 'react-router-dom'


// import { useFetch } from '../../hooks/useFetch';
import { useTheme } from '../../hooks/useTheme';
import { projectFirestore } from '../../firebase/config'
import './Recipe.css'

function Recipe() {
    
            //Раніше ми фетчили data
    // const url = 'http://localhost:8000/recipes/'+id
    // const { data: recipE, isPending, error } = useFetch(url)

    const {id} = useParams()  //тепер воно бере id з ФайрБ
    const history = useHistory()
    const { mode } = useTheme()

    const [recipE, setRecipE] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)

//connect to FireBase
    useEffect(() => {
        setIsPending(true)
        
        //.doc бо треба окремий док-т, тому дістаємо референс док-та
        //projectFirestore.collection('recipe').doc(id).get().then((doc) => {
        //_____________________________________________________________
        const unSUB = projectFirestore.collection('recipe').doc(id).onSnapshot((doc) => {
            if (doc.exists){
                setIsPending(false)
                setRecipE(doc.data())
            } else {
                setIsPending(false)
                setError('Could not find that recipe')
            }
        })

        return () => unSUB()

    }, [id])

//delete + redirect
    // const handleDelete = () => {
        // fetch('http://localhost:8000/recipes/'+recipE.id, {
        //     method: 'DELETE'
        // }).then(()=>{
        //     history.push('/')
        // })
    // }

//Update
    // const handleClick = () => {
    //     projectFirestore.collection('recipe').doc(id).update({
    //         title: 'Veg pizza'
    //     })
    // }

    useEffect(() => {
        if(error){
            setTimeout(()=>{
                history.push('/')
            }, 2000)
        }
    }, [error, history])

    return ( 
        <div className={`recipe ${mode}`}>
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
                    {/* <button onClick={handleClick}>Update the recipe</button> */}
                </>
           )}

        </div>
     );
}

export default Recipe;