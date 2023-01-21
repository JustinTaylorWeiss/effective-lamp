import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const PrivateRoute = () => {
    const { currentUser } = useAuth();

    return currentUser 
        ? <Outlet/> 
        : <Navigate to="/login"/>
}

export const UnPrivateRoute = () => {
    const { currentUser } = useAuth();

    return currentUser 
        ? <Navigate to="/"/>
        : <Outlet/> 
}