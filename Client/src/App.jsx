import React from 'react';
import { Routes, Route, useLocation} from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Create from './components/Create/Create';
import View from './components/View/View';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import './App.css';
import PublicRoute from './components/PublicRoute/PublicRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const App = () => {
  const location = useLocation();

  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="app">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/create" element={<PrivateRoute><Create /></PrivateRoute>} />
        <Route path="/view/:id" element={<PrivateRoute><View /></PrivateRoute>} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
