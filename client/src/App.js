
import React, { useEffect, useContext } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import PrivateRoute from './components/routing/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';



import AlertState from './context/alert/AlertState';
import AuthState from './context/contact/auth/authState';
import AuthContext from './context/contact/auth/authContext';
import ContactState from './context/contact/ContactState';





function App() {
  return (
    <AlertState>
      <AuthState>
        <ContactState>
          <AppWithAuthLoader />
        </ContactState>
      </AuthState>
    </AlertState>
  );
}

function AppWithAuthLoader() {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Router>
      <Navbar />
      <div className="main-container">
        <Alert />
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
