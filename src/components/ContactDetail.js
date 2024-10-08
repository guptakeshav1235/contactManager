import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const ContactDetail = ({ contacts, additionalParams, getImageSrc }) => {
    const location = useLocation();
    const { id } = useParams();

    // Try to get contact from location.state (when navigating from the contact list)
    // let contact = location.state?.contact

    const [contact, setContact] = useState(location.state?.contact || null);

    // If contact is not available in state, try to find it in localStorage
    useEffect(() => {
        if (!contact) {
            const storedContact = JSON.parse(localStorage.getItem(`contact-${id}`));

            if (storedContact) {
                setContact(storedContact);
            } else {
                const foundContact = contacts.find((c) => c.id === id);
                if (foundContact) {
                    setContact(foundContact);
                    localStorage.setItem(`contact-${id}`, JSON.stringify(foundContact));
                }
            }
        }
    }, [id, contacts, contact]);

    // Save contact to localStorage if found
    // useEffect(() => {
    //     if (contact) {
    //         localStorage.setItem(`contact-${id}`, JSON.stringify(contact));
    //     }
    // }, [contact, id]);

    // Ensure contact is defined before destructuring
    if (!contact) {
        return <div>Loading contact details...</div>;  // Fallback while loading
    }

    console.log('Location State:', location.state);
    const { name, email, image } = contact;

    const ImageHandler = getImageSrc(image);
    return (
        <div className="contact-detail-container">
            <div className="ui card centered contact-card" style={{ marginTop: '60px' }}>
                <div className="image">
                    <img src={ImageHandler} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>
            <div className="ui container center aligned back-button">
                <Link to={`/contact${additionalParams}`}>
                    <button className="ui button blue">Back to Contact List</button>
                </Link>
            </div>
        </div>
    );
};

export default ContactDetail;