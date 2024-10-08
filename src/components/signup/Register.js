import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css'

const Register = ({ onRegister, additionalParams }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        // Store form data in localStorage
        const { name, email, password, confirmPassword } = formData;

        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Password validation (min 8 characters, at least 1 number, 1 special character)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must be at least 8 characters long and include at least one number, one special character, and one letter.');
            return;
        }

        if (!name || !email || !password || !confirmPassword) {
            alert('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const existingUser = JSON.parse(localStorage.getItem('users')) ?? [];

        const userExist = existingUser.some(user => user.email === email);
        if (userExist) {
            alert('User with this email is already exist');
            return;
        }

        const newUser = { name, email, password };
        const updatedUser = [...existingUser, newUser];

        localStorage.setItem('users', JSON.stringify(updatedUser));
        // Clear form fields
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });

        if (onRegister) {
            onRegister({ name, email, password, confirmPassword });
        }

        // Navigate to login page
        navigate(`/login${additionalParams}`);

    }
    return (
        <div className="register-container">
            <div className='form-wrapper'>
                <h2 className="form-login" style={{ marginTop: '50px' }}>Sign Up to Our Contact Manager</h2>
                <form className="ui form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="ui container center aligned" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Link to='/'>
                            <button className="ui button red">Home</button>
                        </Link>
                        <button className="ui button blue">Register</button>
                    </div>
                    <div className='ui center aligned'>
                        <Link to={`/login${additionalParams}`} className='login-link'>Already have an account? Log in here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;