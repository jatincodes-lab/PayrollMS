import React from 'react'
import { useAuth } from '../context/AuthContext.jsx';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    if(loading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner or similar
    };

    return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute
