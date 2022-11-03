// import { useFetch } from '../../hooks/useFetch';
import { useEffect, useRef, useState } from 'react';
import {Redirect, useHistory} from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'
import './Create.css'

function Create() {
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [newIngredient, setNewIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const ingredientInput = useRef(null)
    const history = useHistory()

    // const {postData, data, error} = useFetch('http://localhost:8000/recipes', 'POST')

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // postData({title, ingredients, method, cookingTime: cookingTime + ' minutes'})
        const doc = {title, ingredients, method, cookingTime: cookingTime + ' minutes'}        
        
        try{
            //add генерує новий документ всередині колекції і автоматично додає унакальний id
            await projectFirestore.collection('recipe').add(doc)
            history.push('/')
        } catch(err) {
            console.log(err)
        }
        
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const ing = newIngredient.trim()  //trim - take away any whitespace
        //перевірка чи ingS вміщують  повторні інгридієнти(ingredient)
        if(ing && !ingredients.includes(ing)){
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        }
        setNewIngredient('')
        ingredientInput.current.focus()  //focus - фокусується на інпуті, так що курсор автоматично на на тому ж інпуті залиш
    }
//redirect - прибрали, бо використали його в функціїї handleSubmit
    // useEffect(() => {
    //     if(data){
    //         // <Redirect to='/'/>
    //         history.push('/')
    //     }
        
    // }, [data, history])

    return (
        <div className='create'>
            <h2 className='page-title'> Add New recipe</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Recipe title:</span>
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </label>

                <label>
                    <span>Recipe ingredients:</span>
                    <div className='ingredients'>
                        <input 
                        type="text"
                        onChange={(e) => setNewIngredient(e.target.value)}
                        value={newIngredient}
                        ref={ingredientInput}
                        />
                        <button className='btn' onClick={handleAdd}>add</button>
                    </div>
                </label>
                <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

                <label>
                <span>Recipe method:</span>
                <textarea
                    onChange={(e) => setMethod(e.target.value)}
                    value={method}
                    required
                />
                </label>
                

                <label>
                <span>Cooking time (minutes):</span>
                <input
                    type="number"
                    onChange={(e) => setCookingTime(e.target.value)}
                    value={cookingTime}
                    required
                />
                </label>

                <button className='btn'>Submit</button>
            </form>
        </div>
    );
}

export default Create;