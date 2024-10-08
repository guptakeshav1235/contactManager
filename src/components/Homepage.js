import React from "react";
import { Link } from "react-router-dom";
import contacts_illustration from '../images/contacts-illustration.jpg'
import '../App.css'

const Homepage = ({ additionalParams }) => {
    return (
        <div className="homepage-container">
            <div className="ui container center aligned">
                <h1 className="homepage-title" style={{ marginTop: '50px' }}>Welcome to the Contact Manager</h1>
                <p className="homepage-description">
                    Manage your contacts easily and efficiently.
                </p>
                <div className="ui buttons">
                    <Link to={`/register${additionalParams}`}>
                        <button className="ui button green large">Sign Up</button>
                    </Link>
                    <div className="or"></div>
                    <Link to={`/login${additionalParams}`}>
                        <button className="ui button blue large">Sign In</button>
                    </Link>
                </div>
            </div>
            <div className="homepage-animation">
                <img src={contacts_illustration} alt="Contacts Illustration" />
            </div>
        </div>
    );
}

export default Homepage;