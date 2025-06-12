import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import Loading from '../components/Loading';
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading/>;
    }

    return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;