import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MovieDetail from './containers/MovieDetail';
import Login from './containers/Login';
import PrivateRoute from './components/atoms/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/atoms/Navbar';
import Home from './containers/Home';
import Favorites from './containers/Favorites';
import Admin from './containers/Admin';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute roles={['admin']} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
