// This file was moved from src/contacts/ContactReducer.js
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

const contactReducer = (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                loading: false
            };
        case GET_CONTACTS:
            return {
                ...state,
                contacts: Array.isArray(action.payload) ? action.payload : [],
                loading: false
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => (contact._id || contact.id) !== action.payload),
                loading: false
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact =>
                    (contact._id || contact.id) === (action.payload._id || action.payload.id) ? action.payload : contact
                ),
                loading: false
            };
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(action.payload, 'i');
                    return regex.test(contact.name) || regex.test(contact.email);
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: [],
                filtered: null,
                error: null,
                current: null,
                loading: false
            };
        default:
            return state;
    }
};

export default contactReducer;
