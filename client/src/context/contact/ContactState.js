// This file was moved from src/contacts/ContactState.js
import React, { useReducer } from 'react';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import ContactContext from './ContactContext';
import contactReducer from './ContactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../../types';

const ContactState = (props) => {
    // Set Current Contact
    const setCurrent = contact => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        });
    };

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        });
    };
    // Delete Contact (DELETE from backend)
    const deleteContact = async id => {
        if (localStorage.token) setAuthToken(localStorage.token);
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            });
        } catch (err) {
            let errorMsg = err.message;
            if (err.response && err.response.data) {
                if (Array.isArray(err.response.data.errors) && err.response.data.errors.length > 0) {
                    errorMsg = err.response.data.errors.map(e => e.msg).join(' | ');
                } else if (err.response.data.msg) {
                    errorMsg = err.response.data.msg;
                }
            }
            dispatch({
                type: CONTACT_ERROR,
                payload: errorMsg
            });
        }
    };
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null,
        loading: true
    };
    // Fetch contacts from backend
    const getContacts = async () => {
        if (localStorage.token) setAuthToken(localStorage.token);
        try {
            const res = await axios.get('/api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch (err) {
            let errorMsg = err.message;
            if (err.response && err.response.data) {
                if (Array.isArray(err.response.data.errors) && err.response.data.errors.length > 0) {
                    errorMsg = err.response.data.errors.map(e => e.msg).join(' | ');
                } else if (err.response.data.msg) {
                    errorMsg = err.response.data.msg;
                }
            }
            dispatch({
                type: CONTACT_ERROR,
                payload: errorMsg
            });
        }
    };

    // Clear all contacts from state (e.g., on logout)
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS });
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add Contact (POST to backend)
    const addContact = async contact => {
        if (localStorage.token) setAuthToken(localStorage.token);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
        } catch (err) {
            let errorMsg = err.message;
            if (err.response && err.response.data) {
                if (Array.isArray(err.response.data.errors) && err.response.data.errors.length > 0) {
                    errorMsg = err.response.data.errors.map(e => e.msg).join(' | ');
                } else if (err.response.data.msg) {
                    errorMsg = err.response.data.msg;
                }
            }
            dispatch({
                type: CONTACT_ERROR,
                payload: errorMsg
            });
        }
    };

    // Update Contact (PUT to backend)
    const updateContact = async contact => {
        if (localStorage.token) setAuthToken(localStorage.token);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.put(`/api/contacts/${contact._id || contact.id}`, contact, config);
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            });
        } catch (err) {
            let errorMsg = err.message;
            if (err.response && err.response.data) {
                if (Array.isArray(err.response.data.errors) && err.response.data.errors.length > 0) {
                    errorMsg = err.response.data.errors.map(e => e.msg).join(' | ');
                } else if (err.response.data.msg) {
                    errorMsg = err.response.data.msg;
                }
            }
            dispatch({
                type: CONTACT_ERROR,
                payload: errorMsg
            });
        }
    };

    // Filter Contacts
    const filterContacts = text => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        });
    };

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };


    // Clear error
    const clearError = () => {
        dispatch({ type: CONTACT_ERROR, payload: null });
    };

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            loading: state.loading,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts,
            clearError
        }}>
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
