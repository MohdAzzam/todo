import base64 from 'base-64';
// import jwt from 'jsonwebtoken';
import useAjax from './useAjax';

export const AuthHelper = {
    login: (username, password) => {
        const encoded = base64.encode(`${username}:${password}`);
        return useAjax.post("signin", {}, {
            headers: { Authorization: `Basic ${encoded}` }
        });
    },
    signup: (username, password) => {
        return useAjax.post("signup", {
            username: username,
            password: password
        })
    }
}

// function validateToken(token) {
//     const user = jwt.decode(token);
//     if (user) {
//         setLoggedIn(true);
//         setUser(user);
//         cookie.save('auth-token', token);

//     }
// }