import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/contact/auth/authContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) return null; // or a spinner
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
