// Register.js - Registration form component
import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/contact/auth/authContext';
import AlertContext from '../../context/alert/alertContext';


const Register = () => {

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const { name, email, password, password2 } = form;

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const { register, error, isAuthenticated, clearErrors } = authContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        if (error) {
            setAlert(error, 'danger');
            clearErrors();
        }
        // Optionally redirect if isAuthenticated
    }, [error, isAuthenticated, setAlert, clearErrors]);

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (!name || !email || !password) {
            setAlert('Please fill in all fields', 'danger');
        } else if (password.length < 6) {
            setAlert('Password must be at least 6 characters', 'danger');
        } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ name, email, password });
        }
    };

    return (
        <div className="auth-form-card">
            <h2 className="mb-4">Register</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        className="form-control"
                        placeholder="Name"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        className="form-control"
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        className="form-control"
                        placeholder="Password"
                        required
                        minLength={6}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        name="password2"
                        value={password2}
                        onChange={onChange}
                        className="form-control"
                        placeholder="Confirm Password"
                        required
                        minLength={6}
                    />
                </div>
                {/* Alert is handled globally */}
                <button type="submit" className="btn btn-primary w-100 mt-2">Register</button>
            </form>
        </div>
    );
};

export default Register;
