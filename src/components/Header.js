import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ onLogout, isAuthenticated, additionalParams }) => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        onLogout();
    };

    const handleNavigation = () => {
        isAuthenticated ? navigate(`/contact${additionalParams}`) : navigate('/');
    };

    return (
        <div className="ui fixed menu">
            <div className="ui container center aligned">
                <h2>
                    {/* Conditional navigation based on authentication */}
                    <span className="header-title" onClick={handleNavigation} style={{ cursor: 'pointer' }}>
                        Contact Manager
                    </span>
                    {/* Show Logout button only when the user is authenticated */}
                    {isAuthenticated && (
                        <span className="logout-button" onClick={logoutHandler} style={{ marginLeft: '20px', cursor: 'pointer' }}>
                            Logout
                        </span>
                    )}
                </h2>
            </div>
        </div>
    );
};

export default Header;
