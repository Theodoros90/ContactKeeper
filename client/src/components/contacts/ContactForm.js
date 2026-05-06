// ContactForm.js - Form for adding or editing a contact
import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const { addContact, updateContact, current, clearCurrent, error } = contactContext;

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [current]);

    const { name, email, phone, type } = contact;

    const onChange = e => {
        setContact({ ...contact, [e.target.name]: e.target.value });
        if (formError) setFormError(''); // Clear error when user starts typing
    };

    const [formError, setFormError] = useState('');

    const validate = () => {
        // Only run frontend validation if fields are not empty, otherwise let backend handle required errors
        if (name && !name.trim()) {
            setFormError('Name is required');
            return false;
        }
        if (email && !/^\S+@\S+\.\S+$/.test(email)) {
            setFormError('Please include a valid email');
            return false;
        }
        if (phone && !/^[\d\s\-+]{10,}$/.test(phone) && phone) {
            setFormError('Please include a valid phone number');
            return false;
        }
        setFormError('');
        return true;
    };

    const onSubmit = async e => {
        e.preventDefault();
        // Only run frontend validation if fields are not empty
        if (name || email || phone) {
            if (!validate()) return;
        }
        if (current === null) {
            await addContact(contact);
        } else {
            await updateContact(contact);
        }
        // Wait for error to be set by context (next render)
        setTimeout(() => {
            // Only clear form and error if no backend error and phone is not empty
            if (!error && phone) {
                setFormError('');
                setContact({
                    name: '',
                    email: '',
                    phone: '',
                    type: 'personal'
                });
                clearCurrent();
            }
            // If phone is empty and backend error, keep error visible
        }, 100);
    };

    const handleClear = () => {
        clearCurrent();
    };


    // Clear backend error after showing it, so repeated errors will show again
    useEffect(() => {
        if (error) {
            setFormError(error);
            // Auto-close error after 1 second
            const timer = setTimeout(() => {
                setFormError('');
                if (contactContext.clearError) contactContext.clearError();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [error, contactContext]);

    return (
        <form onSubmit={onSubmit} className="contact-form-card">
            <h4 className="mb-3">{current ? 'Edit Contact' : 'Add Contact'}</h4>
            {formError && <div className="alert alert-danger py-2">{formError}</div>}
            <div className="mb-3">
                <input type="text" name="name" value={name} onChange={onChange} className="form-control" placeholder="Name" required />
            </div>
            <div className="mb-3">
                <input type="email" name="email" value={email} onChange={onChange} className="form-control" placeholder="Email" />
            </div>
            <div className="mb-3">
                <input type="text" name="phone" value={phone} onChange={onChange} className="form-control" placeholder="Phone" />
            </div>
            <div className="mb-3">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="type" id="personal" value="personal" checked={type === 'personal'} onChange={onChange} />
                    <label className="form-check-label" htmlFor="personal">Personal</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="type" id="professional" value="professional" checked={type === 'professional'} onChange={onChange} />
                    <label className="form-check-label" htmlFor="professional">Professional</label>
                </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">{current ? 'Update Contact' : 'Add Contact'}</button>
            {current && (
                <button type="button" className="btn btn-secondary w-100 mt-2" onClick={handleClear}>
                    Clear
                </button>
            )}
        </form>
    );
};

export default ContactForm;
