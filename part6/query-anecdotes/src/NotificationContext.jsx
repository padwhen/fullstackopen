import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return {
                message: action.message,
                isVisible: true
            }
        case 'HIDE_NOTIFICATION':
            return {
                ...state,
                isVisible: false
            }
        default: return state
    }
}

const CounterContext = createContext()

export const CounterContextProvider = (props) => {
    const initialState = {
        message: '',
        isVisible: false
    }
    const [counter, counterDispatch] = useReducer(notificationReducer, initialState)
    return (
        <CounterContext.Provider value={[counter, counterDispatch]}>
            {props.children}
        </CounterContext.Provider>
    )
}

export const useCounterValue = () => {
    const counterAndDispatch = useContext(CounterContext)
    return counterAndDispatch[0]
}

export const useCounterDispatch = () => {
    const counterAndDispatch = useContext(CounterContext)
    return counterAndDispatch[1]
}

export default CounterContext