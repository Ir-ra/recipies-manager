
// import { useParams } from 'react-router-dom';
// import {useFetch} from '../../hooks/useFetch.js'

import { useEffect, useState } from 'react';
import RecipeList from '../../components/RecipeList.js';

import { projectFirestore } from '../../firebase/config'

import './Home.css'

function Home() {

            //Раніше ми фетчили data
    // const  { data: recipes, isPending, error } = useFetch('http://localhost:8000/recipes')
    // const {id} = useParams()

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)

            //Зараз будемо це робити через Firebase (майже як в useFetch hook)
    useEffect(() => {
        setIsPending(true)

        //colle-n зєднує з коле-ю на ФайрБейс (там під назвою recipes) і робить типу снепшот
        //воно А-синхолнне, тому можна викликати метод then
        //projectFirestore.collection('recipe').get().then((snapshot) => {
        //---------------------------------------------------------
       
        // !!!  onSnapshot піждигає функцію за допомоги snapshot !!!
        const unsub = projectFirestore.collection('recipe').onSnapshot((snapshot) => {
            //snap-t має власт-ть empty. Вертає true/false. Перевіряємо чи там щось є
            if (snapshot.empty){
                setError('No recipes to load')
                setIsPending(false)
            } else {
                let results = []
                //snap-t має власт-ть docs. Містить в собі аррей док-в в колекції( те що на ФайрБ)
                snapshot.docs.forEach(doc => {
                    //беремо пустий арр і вставляємо туди новий обьект (окремий рецепт). У doc є власт. id
                    results.push({id: doc.id, ...doc.data()})
                })
                setData(results)
                setIsPending(false)
            }
        }, (err) => {
            setError(err.message)
            setIsPending(false)
        })

        return () => unsub()
    }, [])
    

    return ( 
        <div className='home'>
            {isPending && <p className='loading'>Loading...</p>}
            {error &&  <p className='error'>{error}</p>}
            {data && <RecipeList recipes={data} />}
        </div>
     );
}

export default Home;