import React from "react";
import { Link } from "react-router-dom";

const ContactCard = (props) => {
    const { id, name, email, image } = props.contact;

    // // Helper function to determine image source
    // const getImageSrc = (image) => {
    //     if (image instanceof Blob || image instanceof File) {
    //         // If it's a file or Blob, create an object URL
    //         return URL.createObjectURL(image);
    //     } else if (typeof image === 'string') {
    //         // If it's a string (e.g., base64 or URL), use it directly
    //         return image;
    //     } else {
    //         // Otherwise, return the default image
    //         return user;
    //     }
    // };

    const ImageHandler = props.getImageSrc(image);
    return (
        <div className="item" style={{ position: 'relative' }}>
            <img className="ui avatar image" src={ImageHandler} alt="user" />
            <div className="content">
                {/* <Link to={`/contact/${id}`}> */}
                <Link to={`/contact/${id}${props.additionalParams}`} state={{ contact: props.contact }}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>
            </div>
            <i
                className="trash alternate outline icon"
                style={{
                    color: "red", marginTop: "7px",
                    position: "absolute",
                    right: "0",
                    top: "35%",
                    transform: "translateY(-50%)"
                }}
                onClick={() => props.clickHandler(id)}
            ></i>
        </div>
    );
};

export default ContactCard;