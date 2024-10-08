import React, { useRef, useState } from "react";
import ContactCard from "./ContactCard";
import '../App.css'
import AddContact from "./AddContact";

const ContactList = (props) => {

    const listRef = useRef(null);// Reference to access the contact list for scrolling

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scrollInterval, setScrollInterval] = useState(null);

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

    // const ImageSrcHandler = (image) => {
    //     props.getImageSrc(image);
    // }

    // const logoutHandler = () => {
    //     props.onLogout();
    //     navigate('/login');
    // }

    // Open modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Scroll down function
    const startScrollDown = () => {
        if (listRef.current) {
            const interval = setInterval(() => {
                listRef.current.scrollBy({
                    top: 100, // Scrolls up by 100px
                    behavior: 'smooth'
                });
            }, 100);
            setScrollInterval(interval);
        }
    };

    // Scroll up function
    const startScrollUp = () => {
        if (listRef.current) {
            const interval = setInterval(() => {
                listRef.current.scrollBy({
                    top: -100, // Scrolls up by 100px
                    behavior: 'smooth'
                });
            }, 100);
            setScrollInterval(interval);
        }
    };

    // Stop the scrolling when hover ends
    const stopScroll = () => {
        if (scrollInterval) {
            clearInterval(scrollInterval);// Clear the interval to stop scrolling
            setScrollInterval(null);
        }
    }


    // const contacts = [
    //     {
    //         id: "1",
    //         name: "Keshav",
    //         email: 'guptakeshav1235@gmail.com'
    //     }
    // ]

    // const renderContactList = contacts.map((contact) => {

    //When using routes we use props.
    const renderContactList = props.contacts.map((contact) => {
        return <ContactCard
            contact={contact}
            clickHandler={deleteContactHandler}
            getImageSrc={props.getImageSrc}
            key={contact.id}
            additionalParams={props.additionalParams}
        />;
    });

    return (
        <>
            {renderContactList.length === 0 ? (
                <div className="no-contacts-message">
                    <h2 className="title">No Contacts Found</h2>
                    <p className="description">Looks like your contact list is empty. Start adding some contacts now!</p>
                    <button className="ui button green" onClick={openModal}>Add Contact</button>
                    {isModalOpen && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <button className="close-button" onClick={closeModal}>X</button>
                                <AddContact addContactHandler={props.addContactHandler} closeModal={closeModal} />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="main contact-list-container">
                    <div className="header-section">
                        <h2 className="contact-list-title">Contact List</h2>
                        <div className="button-section">
                            <button className="ui button green" onClick={openModal}>Add Contact</button>
                            {/* <button className="ui button red right" onClick={logoutHandler}>Logout</button> */}
                        </div>
                    </div>

                    {/* Upper arrow for scrolling up */}
                    <div className="arrow-container">
                        {/* Upper arrow for scrolling up */}
                        <i className="angle up icon large"
                            onMouseEnter={startScrollUp}
                            onMouseLeave={stopScroll}
                            style={{ cursor: 'pointer' }}>
                        </i>
                    </div>

                    <div className="ui celled list contact-list" ref={listRef}>
                        {renderContactList}
                    </div>

                    {isModalOpen && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <button className="close-button" onClick={closeModal}>X</button>
                                <AddContact addContactHandler={props.addContactHandler} closeModal={closeModal} />
                            </div>
                        </div>
                    )}

                    {/* Lower arrow for scrolling down */}
                    <div className="arrow-container">
                        {/* Lower arrow for scrolling down */}
                        <i className="angle down icon large"
                            onMouseEnter={startScrollDown}
                            onMouseLeave={stopScroll}
                            style={{ cursor: 'pointer' }}>
                        </i>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactList;