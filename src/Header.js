import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import Auth from "./context/Auth";
import UserNav from "./screens/User/UserNav";
import GuestNav from "./screens/User/GuestNav";

export default withRouter(function Header({ location, history }) {

    const { user } = useContext(Auth.Context);

    if (!user.isGuestUser) {
        return (<UserNav history={history} />);
    }

    return (<GuestNav />);

});