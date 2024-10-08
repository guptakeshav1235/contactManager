// import React from "react";
// import '../App.css';
// import { Navigate } from "react-router-dom";

// class AddContact extends React.Component {
//     state = {
//         name: "",
//         email: "",
//         redirectToHome: false
//     }

//     add = (e) => {
//         e.preventDefault();
//         if (this.state.name === "" || this.state.email === "") {
//             alert("All the fields are mandatory!");
//             return;
//         }
//         this.props.addContactHandler(this.state);
//         this.setState({ name: "", email: "", redirectToHome: true });
//         // console.log(this.state);
//         console.log(this.props);

//     }
//     render() {
//         if (this.state.redirectToHome) {
//             return <Navigate to="/" />; // Redirect to homepage when redirectToHome is true
//         }

//         return (
//             <div className="ui main">
//                 <h2 className="form-contact">Add Contact</h2>
//                 <form className="ui form" onSubmit={this.add}>
//                     <div className="field">
//                         <label>Name</label>
//                         <input
//                             type="text"
//                             name="name"
//                             placeholder="Name"
//                             value={this.state.name}
//                             onChange={(e) => this.setState({ name: e.target.value })}
//                         />
//                     </div>
//                     <div className="field">
//                         <label>Email</label>
//                         <input
//                             type="text"
//                             name="email"
//                             placeholder="Email"
//                             value={this.state.email}
//                             onChange={(e) => this.setState({ email: e.target.value })}
//                         />
//                     </div>
//                     <button className="ui button blue">Add</button>
//                 </form>
//             </div>
//         );
//     }
// }
// export default AddContact;




import React, { useState } from "react";
import '../App.css';

const AddContact = ({ addContactHandler, closeModal }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);

    const add = (e) => {
        e.preventDefault();

        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (name === "" || email === "") {
            alert("All the fields are mandatory!");
            return;
        }
        addContactHandler({ name, email, image }); // Pass name and email as an object
        // setName(""); // Reset the name input
        // setEmail(""); // Reset the email input
        // navigate("/contact");
        closeModal();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);// Base64 encoded image string
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="ui main">
            <h2 className="form-contact" style={{ marginTop: '50px' }}>Add Contact</h2>
            <form className="ui form" onSubmit={add}>
                <div className="field">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Update state on change
                    />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update state on change
                    />
                </div>
                <div className="field">
                    <label>Profile Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <div className="ui container center aligned">
                    <button className="ui button blue">Add Contact</button>
                </div>
            </form>
        </div>
    );
}

export default AddContact;
