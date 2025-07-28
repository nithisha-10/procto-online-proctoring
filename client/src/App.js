import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Changed: Switch → Routes
import "./App.css"
import { Provider } from "react-redux";
import store from "./store";

import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import TestPage from "./components/exam_page/TestPage";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwtDecode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Routes> {/* Changed: Switch → Routes */}
              <Route path="/" element={<Landing />} /> {/* Changed: component → element */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/test" element={<PrivateRoute><TestPage /></PrivateRoute>} />
            </Routes>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;