
import React, { createContext, useState } from "react";
import { useCallback } from "react";
import cookie from "../util/cookie";
import storage from "../util/storage";
import jwt from "jsonwebtoken";
const Context = createContext();
const USER_TOKEN_KEY = 'user-token';
const USER_INFO_KEY = 'user-data';

const guest = { isGuestUser: true, name: "Guest" };

/**
 * Get user from localstorage and check if login as 
 * check user data and token 
 * 
 * @returns 
 */
function getUser() {
    const user = storage.get(USER_INFO_KEY);
    const token = cookie.get(USER_TOKEN_KEY);
    if (!token || !user || user.isGuestUser) return guest;
    return user;
}

function Provider({ children }) {

    const [user, setUser] = useState(getUser());

    /**
     * Handle login user
     * @param {Object} userData
     * @param {string} token
     */
    const handleLogin = useCallback((userData, token) => {
        setUser(userData);
        storage.set(USER_INFO_KEY, userData);
        cookie.set(USER_TOKEN_KEY, token);
    }, []);

    /**
     * Handle logout user
     */
    const handelLogout = useCallback(() => {
        setUser(guest);
        storage.remove(USER_INFO_KEY);
        cookie.remove(USER_TOKEN_KEY);
    }, []);

    /**
     * Extract user roles form jwt token
     * 
     * @returns list of user roles
     */
    const getUserRoles = useCallback(() => {
        let token = cookie.get(USER_TOKEN_KEY);
        let decodeToken = jwt.decode(token);
        if (!decodeToken) {
            return [];
        }
        
        let roles = decodeToken.capabilities;
       
        return roles;
    }, [])

    const userIsCan = useCallback((role) => {
        let userRoles = getUserRoles();

        return userRoles.includes(role);
    }, [getUserRoles]);

    return (
        <Context.Provider
            value={{
                user,
                handleLogin,
                handelLogout,
                getUserRoles,
                userIsCan
            }}
        >
            {children}
        </Context.Provider>
    );

}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    Context,
    Provider,
    Consumer: Context.Consumer,
};