// ContactItem.js - Displays a single contact

import React, { useContext, forwardRef } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactItem = forwardRef(({ contact }, ref) => {
    const { deleteContact, setCurrent } = useContext(ContactContext);

    const handleDelete = () => {
        deleteContact(contact._id || contact.id);
    };

    const handleEdit = () => {
        setCurrent(contact);
    };

    return (
        <div ref={ref} className="contact-card">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">{contact.name}</h5>
                <span className={`badge ${contact.type === 'professional' ? 'bg-success' : 'bg-primary'}`}>{contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}</span>
            </div>
            <ul className="list-unstyled mb-0">
                {contact.email && (
                    <li>
                        <i className="fa-solid fa-envelope me-2" title="Email"></i>
                        {contact.email}
                    </li>
                )}
                {contact.phone && (
                    <li><i className="fas fa-phone me-2"></i>{contact.phone}</li>
                )}
            </ul>
            <div className="mt-3 d-flex gap-2">
                <button className="btn btn-outline-primary" title="Edit" onClick={handleEdit}>
                    <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn btn-outline-danger" title="Delete" onClick={handleDelete}>
                    <i className="fas fa-trash-alt"></i> Delete
                </button>
            </div>
        </div>
    );
});

export default ContactItem;
