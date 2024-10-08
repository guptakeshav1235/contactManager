import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, children, additionalParams }) => {
    const location = useLocation();//Capture the current route
    return isAuthenticated ? children :
        <Navigate
            to={`/login${additionalParams}`}
            state={{ from: location }} // Pass the current location (intended route) as state
        />;
};

export default PrivateRoute;
