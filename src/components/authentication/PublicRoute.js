import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ isAuthenticated, children, additionalParams }) => {
    return isAuthenticated ? <Navigate to={`/contact${additionalParams}`} /> : children;
};

export default PublicRoute;
