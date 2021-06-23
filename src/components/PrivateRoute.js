import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../context/Auth";

export default function PrivateRoute({ component: Component, ...props }) {
    const { user } = useContext(Auth.Context);
    const path = props.computedMatch.path;
    let userNotAllow = false;

    if (path !== "login" || path !== "register") {
        userNotAllow = true;
    }

    return (
        <Route
            {...props}
            render={(renderProps) =>
                user.isGuestUser && userNotAllow ? (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: renderProps.location },
                        }}
                    />
                ) : (
                    <Component {...renderProps} />
                )
            }
        />
    );
}