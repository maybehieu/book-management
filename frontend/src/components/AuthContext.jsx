import React, { createContext, useEffect, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [activeUser, setActiveUser] = useState('')
    const updateLoginStatus = (status) => {
        setIsLoggedIn(status);
        localStorage.setItem('isLoggedIn', status);
    };

    const updateAdminStatus = (status) => {
        setIsAdmin(status);
        localStorage.setItem('isAdmin', status);
    };

    const updateActiveUser = (user) => {
        setActiveUser(user);
        localStorage.setItem('activeUser', user);
    };

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        const storedIsAdmin = localStorage.getItem('isAdmin');
        const storedActiveUser = localStorage.getItem('activeUser');

        if (storedIsLoggedIn && storedIsAdmin && storedActiveUser) {
            setIsLoggedIn(storedIsLoggedIn === 'true');
            setIsAdmin(storedIsAdmin === 'true');
            setActiveUser(storedActiveUser);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoggedIn, isAdmin, activeUser, updateLoginStatus, updateAdminStatus, updateActiveUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};