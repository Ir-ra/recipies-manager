import { createContext, useReducer } from "react";


export const ThemeContext = createContext()
//вище. це вертає новий контекст обєкт
//в ньому є контекстПровайдер (як копмонент) <ThemeContext.Provier/>
//by the value of this context він огортає інші компоненти (дерева з компо-ів)
//можна додати у index.js (як один з варіків застосування)


const themeReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return {...state, color: action.payload}
        case 'CHANGE_MODE' :
            return{...state, mode: action.payload}      
        default:
            return state;
    }
}

//тут використовуємо Редюсер / DarK-Light Mode
export function ThemeProvider({children}){
    const [state, dispatch] = useReducer(themeReducer, {
        color: '#cccc18',
        mode: 'ligth'
    })

    const changeColor = (color) => {
        dispatch({type: 'CHANGE_COLOR' , payload: color}) //dispatch action
    }

    //Change MODE
    const changeMode = (mode) => {
        dispatch({type: 'CHANGE_MODE', payload: mode})
    }

    

    return (
        <ThemeContext.Provider value={{...state, changeColor, changeMode}}>
            {children}
        </ThemeContext.Provider>
    )
}
//як це працює? 1)ми створ ThemeContext обєкт 2) створ реакт компонент  ThemeProvider
//3) і цей компонент має шаблон в якому рендериться ThemeContext.Provider
//4)а вже в ньому (провайдері) ми вставляємо children компоненти
//тобто, всі children компоненти мають доступ до ThemeContext.Provider value 
//в index.js ми огорнули у ThemeProvider компонент App. тепер App компонент буде value of children prop
//Тепер можемо вкласти кастомну логіку в цей компонент(яка трекає value яку вклали у Провайдер)

