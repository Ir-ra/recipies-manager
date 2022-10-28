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
                
        default:
            return state;
    }
}

//тутвикористовуємо Редюсер
export function ThemeProvider({children}){
    const [state, dispatch] = useReducer(themeReducer, {
        color: 'blue'
    })

    const changeColor = (color) => {
        dispatch({type: 'CHANGE_COLOR' , payload: color})
    }

    //custom logic

    return (
        <ThemeContext.Provider value={{...state, changeColor}}>
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

