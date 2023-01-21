import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updatePassword, updateEmail, updateProfile } from "firebase/auth";

const AuthContext = React.createContext()

export const useAuth = () => (
    useContext(AuthContext)
);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if(user) {
                setCurrentUser(user)
            }
            setLoading(false);
        })
    }, []);

    const signup = async(email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
    };

    const login = async(email, password) => {
        await signInWithEmailAndPassword(auth, email, password)
    };

    const logout = async() => {
        await signOut(auth);
        setCurrentUser(null);
    };

    const resetPassword = async(email) => {
        await sendPasswordResetEmail(auth, email)
    };

    const updateUserEmail = async(email) => {
        await updateEmail(auth.currentUser, email)
    };

    const updateUserPassword = async(password) => {
        await updatePassword(auth.currentUser, password)
    };

    const updateDisplayName = async(displayName) => {
        await updateProfile(auth.currentUser, { displayName: displayName });
        setCurrentUser(auth.currentUser);
    };

    const verifyEmail = async() => {
        if(auth?.currentUser)
            await sendEmailVerification(auth.currentUser);
    };

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateUserEmail,
        updateUserPassword,
        verifyEmail,
        updateDisplayName,
    };

    return <AuthContext.Provider value={value}>
        { !loading && children }
    </AuthContext.Provider>
};