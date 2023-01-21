import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { baseRoute } from '../../App';

export const PrivateRoute = () => {
    const { currentUser } = useAuth();

    return currentUser 
        ? <Outlet/> 
        : <Navigate to={baseRoute+"/login"}/>
}

export const UnPrivateRoute = () => {
    const { currentUser } = useAuth();

    return currentUser 
        ? <Navigate to={baseRoute+"/"}/>
        : <Outlet/> 
}