import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';

const AlertState = (props) => {
    const initialState = {
        alert: null
    };

    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Set Alert
    const setAlert = (msg, type) => {
        dispatch({
            type: 'SET_ALERT',
            payload: { msg, type }
        });
        setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 5000);
    };

    return (
        <AlertContext.Provider
            value={{
                alert: state.alert,
                setAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
