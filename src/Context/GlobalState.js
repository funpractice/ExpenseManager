import {createContext, useReducer} from 'react';
import reducer from './Reducer';
import {deleteAction, addAction, setError, resetError} from './Actions'

//initialState

const initialState={
    transactions:[],
    error:undefined,
}

// create context

export const GlobalContext = createContext(initialState);

//provider component

export const GlobalProvider=({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState);
    
    function addTransaction(transaction){
        dispatch(addAction(transaction));
    }

    function deleteTransaction(id){
        dispatch(deleteAction(id));
    }

    function errorHandler(error){
        dispatch(setError(error));
    }

    function resetErrorHandler(transaction){
        dispatch(resetError());
    }

    return(    
    <GlobalContext.Provider
        value={{
            transactions: state.transactions,
            error: state.error,
            addTransaction,
            deleteTransaction,
            errorHandler,
            resetErrorHandler
        }}
        >
        {children}
        </GlobalContext.Provider>
    );
};