import axios from 'axios';
import setAuthToken from '../../../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../../../types';
// Login user
export const login = async (formData, dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post('/api/auth', formData, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        let errorMsg = 'Login failed';
        if (err.response && err.response.data) {
            if (Array.isArray(err.response.data.errors) && err.response.data.errors.length > 0) {
                errorMsg = err.response.data.errors[0].msg;
            } else if (err.response.data.msg) {
                errorMsg = err.response.data.msg;
            }
        }
        dispatch({
            type: LOGIN_FAIL,
            payload: errorMsg
        });
    }
};

// Load User
export const loadUser = async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        console.log('loadUser response:', res.data);
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        console.log('loadUser error:', err.response ? err.response.data : err);
        dispatch({
            type: AUTH_ERROR
        });
    }
}

// Register user
export const register = async (formData, dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.post('/api/users', formData, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        let errorMsg = 'Registration failed';
        if (err.response && err.response.data) {
            if (Array.isArray(err.response.data.errors) && err.response.data.errors.length > 0) {
                errorMsg = err.response.data.errors[0].msg;
            } else if (err.response.data.msg) {
                errorMsg = err.response.data.msg;
            }
        }
        dispatch({
            type: REGISTER_FAIL,
            payload: errorMsg
        });
    }
};
