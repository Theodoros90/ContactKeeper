// authState.js - Context provider for authentication
import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { register as registerUser, loadUser as loadUserAction, login as loginUser } from './authActions';

const AuthState = (props) => {
    // Logout user
    const logout = () => dispatch({ type: 'LOGOUT' });
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);




    // Register user
    const register = async (formData) => {
        await registerUser(formData, dispatch);
    };

    // Load user
    const loadUser = async () => {
        await loadUserAction(dispatch);
    };

    // Login user
    const login = async (formData) => {
        await loginUser(formData, dispatch);
    };

    // Clear errors
    const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                login,
                loadUser,
                logout,
                clearErrors
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
