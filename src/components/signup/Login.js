import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = ({ onLogin, additionalParams }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const location = useLocation();
    // const redirectTo = location.state?.from?.pathname || '/contact';// Check for redirect route

    // Helper function to generate random string
    // const generateRandomString = (length) => {
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     let result = '';
    //     const charactersLength = characters.length;
    //     for (let i = 0; i < length; i++) {
    //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     return result;
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email || !password) {
            alert('All fields are required.');
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('users')) ?? [];
        const foundUser = storedUsers.find(user => user.email === email && user.password === password)

        if (foundUser) {
            alert('Login Successful!');
            if (onLogin) {
                onLogin({ email, password });
            }

            // Generate random query parameters to simulate a long URL
            // const randomString = generateRandomString(50);
            // const additionalParams = `?sessionToken=${randomString}&status=authenticated&ref=abc123`;

            const redirectTo = location.state?.from?.pathname || `/contact${additionalParams}`;// Check for redirect route

            // Append the query string to the redirect URL
            navigate(`${redirectTo}${additionalParams}`);// Navigate to the intended route after login
        } else {
            alert('invalid email or password');
        }
    }
    return (
        <div className="register-container">
            <div className='form-wrapper'>
                <h2 className="form-login" style={{ marginTop: '50px' }}>Sign In to Our Contact Manager</h2>
                <form className="ui form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Email</label>
                        <input
                            type="text"
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
                    <div className="ui container center aligned" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Link to={`/register${additionalParams}`}>
                            <button className="ui button red">Register</button>
                        </Link>
                        <button className="ui button blue">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;

