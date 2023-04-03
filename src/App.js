import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Profile from './pages/user/Profile';
import Home from './pages/user/Home';
import PrivateRoute from './components/PrivateRoute';
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import AddUser from './pages/admin/AddUser'


function App() {



  return (
    <Router>
      <Routes>
        <Route exact element={<PrivateRoute role='user' />}>
          <Route exact path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route exact path='/admin' element={<AdminLogin />} />
        <Route exact element={<PrivateRoute role='admin' />}>
          <Route exact path='/admin/dashboard' element={<Dashboard />} />
          <Route exact path='/admin/adduser' element={<AddUser />} />
        </Route>

      </Routes>
    </Router >

  )
}

export default App;
