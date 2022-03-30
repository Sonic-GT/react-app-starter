import React, { useLocalState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({child}) => {
    console.log("in");
    const [jwt, setToken] = useLocalState("", "token");
    console.log(jwt);
    const navigate = useNavigate();

    return jwt ? child : navigate("/login");
}

export default PrivateRoute;