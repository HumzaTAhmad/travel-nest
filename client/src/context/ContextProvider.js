import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';


const initialState = {
    currentUser:null
}

const Context = createContext(initialState)

export function useValue(){
    return useContext(Context)
}

function contextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>
    )
}
