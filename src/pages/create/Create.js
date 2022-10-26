
import { useRef, useState } from 'react';
import './Create.css'

function Create() {
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [newIng, setNewIng] = useState('')
    const [ingS, setIngS] = useState([])
    const ingredientInput = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
       
        console.log(title, method, cookingTime, ingS)
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const ingredient = newIng.trim()  //trim - take away any whitespace
        //перевірка чи ingS вміщують  повторні інгридієнти(ingredient)
        if(ingredient && !ingS.includes(ingredient)){
            setIngS(prevIngredients => [...prevIngredients, ingredient])
        }
        setNewIng('')
        ingredientInput.current.focus()  //focus - фокусується на інпуті, так що курсор автоматично на на тому ж інпуті залиш
    }


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
                        onChange={(e) => setNewIng(e.target.value)}
                        value={newIng}
                        ref={ingredientInput}
                        />
                        <button className='btn' onClick={handleAdd}>add</button>
                    </div>
                </label>
                <p>Current ingredients: {ingS.map(i => <em key={i}>{i}, </em>)}</p>

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