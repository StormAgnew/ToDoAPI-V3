import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext'
import Navigation from './components/Navigation'
import Login from './components/Auth/Login'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Categories from './components/Categories/Categories'
import Todos from './components/Todo/Todos'


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<ProtectedRoute><Todos /></ProtectedRoute>} />
            <Route path='/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path='/todos' element={<ProtectedRoute><Todos /></ProtectedRoute>} />
            <Route path='/login' element={<Login />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>

    </div>
  );
}

export default App;
