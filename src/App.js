import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import './App.css';
import Header from './components/Header';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import Register from './components/signup/Register';
import Login from './components/signup/Login';
import Homepage from './components/Homepage';
import PublicRoute from './components/authentication/PublicRoute';
import PrivateRoute from './components/authentication/PrivateRoute';
import user from './images/user.png';
function App() {
  //For static data we use the contacts array
  // const contacts = [
  //   {
  //     id: "1",
  //     name: "Keshav",
  //     email: "guptakeshav1235@gmail.com"
  //   },
  //   {
  //     id: "2",
  //     name: "Aaditya",
  //     email: "aaditya@gmail.com"
  //   }
  // ];

  //To set local storage
  const LOCAL_STORAGE_KEY = "contacts";
  const LOCAL_STORAGE_USER_KEY = 'currentUser';

  //useState
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );

  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const isAuthenticated = !!currentUser;

  const handleRegister = (user) => {
    setRegisteredUsers([...registeredUsers, user]);
    console.log("Registered User:", user);
  };

  const handleLogin = (user) => {
    // setCurrentUser([...currentUser, user]);
    setCurrentUser(user);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    console.log("Logged-in User:", user);
  }

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    console.log("User logged out");
  }

  //function as a prop
  const addContactHandler = (contact) => {
    console.log(contact);
    // setContacts([...contacts, contact]);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  }

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })

    setContacts(newContactList);
  }

  // Helper function to generate random string
  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  // Generate random query parameters to simulate a long URL
  const randomString = generateRandomString(50);
  const additionalParams = `?sessionToken=${randomString}&status=authenticated&ref=abc123`;

  // Helper function to determine image source
  const getImageSrc = (image) => {
    if (image) {
      return image;  // Return the Base64 string or image URL
    } else {
      return user;  // Default image
    }
  };

  //useEffect

  // Save contacts to local storage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  // On app load, check if a user is already logged in from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser)); // Set current user from localStorage
    }
  }, []); // Run only once on mount

  return (
    <div className='ui container'>
      {/* Without Router */}
      {/* <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}

      {/* With Router */}
      <Router>
        <Header onLogout={handleLogout} isAuthenticated={isAuthenticated} additionalParams={additionalParams} />
        <Routes>
          {/* <Route path='/' Component={ContactList} /> */}
          {/* <Route
            path='/'
            Component={() => (
              <ContactList
                contacts={contacts}
                getContactId={removeContactHandler}
              />
            )}
          /> */}
          {/* Homepage */}
          <Route path='/' element={<Homepage additionalParams={additionalParams} />} />

          {/* Login page is a public route, so if already logged in, it redirects to contacts */}
          <Route
            path='/login'
            element={
              <PublicRoute isAuthenticated={isAuthenticated} additionalParams={additionalParams}>
                <Login
                  onLogin={handleLogin}
                  additionalParams={additionalParams}
                />
              </PublicRoute>
            }
          />

          {/* Register page */}
          <Route
            path='/register'
            element={
              <PublicRoute isAuthenticated={isAuthenticated} additionalParams={additionalParams}>
                <Register
                  onRegister={handleRegister}
                  additionalParams={additionalParams}
                />
              </PublicRoute>
            }
          />
          {/* Contacts page is protected, only accessible when authenticated so private route */}
          {/* <Route
            path='/contact'
            element={
              <ContactList 
                contacts={contacts}
                getContactId={removeContactHandler}
                onLogout={handleLogout}
              />
            }
          /> */}

          <Route
            path='/contact'
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} additionalParams={additionalParams}>
                <ContactList
                  contacts={contacts}
                  addContactHandler={addContactHandler}
                  getContactId={removeContactHandler}
                  getImageSrc={getImageSrc}
                  additionalParams={additionalParams}
                />
              </PrivateRoute>
            }
          />

          {/* Add Contact page is also protected */}
          {/* <Route
            path='/add'
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AddContact
                  addContactHandler={addContactHandler} />
              </PrivateRoute>
            }
          /> */}

          {/* Contact detail page (Protected) */}
          <Route
            path='/contact/:id'
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} additionalParams={additionalParams}>
                <ContactDetail contacts={contacts} additionalParams={additionalParams} getImageSrc={getImageSrc} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
