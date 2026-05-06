// ContactFilter.js - Filter contacts by name or email
import React, { useContext, useRef } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactFilter = () => {
    const { filterContacts, clearFilter, filtered } = useContext(ContactContext);
    const text = useRef('');

    const onChange = e => {
        if (e.target.value !== '') {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <form className="mb-3">
            <input
                ref={text}
                type="text"
                placeholder="Filter Contacts..."
                className="form-control"
                onChange={onChange}
            />
        </form>
    );
};

export default ContactFilter;
