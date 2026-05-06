// Login.js - Login form component
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/contact/auth/authContext';
import AlertContext from '../../context/alert/alertContext';


const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const { email, password } = form;


    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const { login, error, isAuthenticated, clearErrors } = authContext;
    const { setAlert } = alertContext;
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            setAlert(error, 'danger');
            clearErrors();
        }
        if (isAuthenticated) {
            navigate('/');
        }
    }, [error, isAuthenticated, setAlert, clearErrors, navigate]);

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (!email || !password) {
            setAlert('Please fill in all fields', 'danger');
        } else {
            login({ email, password });
        }
    };

    return (
        <div className="auth-form-card">
            <h2 className="mb-4">Login</h2>
            <form onSubmit={onSubmit}>
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
                    />
                </div>
                {/* Alert is handled globally */}
                <button type="submit" className="btn btn-primary w-100 mt-2">Login</button>
            </form>
        </div>
    );
};

export default Login;
