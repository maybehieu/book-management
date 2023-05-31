import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminBookDetail from './components/AdminBookDetail';
import CustomerBookDetails from './components/CustomerBookDetails';
import CustomerBooks from './components/CustomerBooks';
import Register from './components/Register';
import Login from './components/Login';
import NavBar from './components/NavBar';
import { AuthContextProvider } from './components/AuthContext';
import Cart from './components/Cart';
import { NavBarProvider } from './components/NavBarContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <NavBarProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/book-add' element={<AdminBookDetail add />} />
            <Route path='/book-update/:bookId' element={<AdminBookDetail />} />
            <Route path='/book/:bookId' element={<CustomerBookDetails />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/books' element={<CustomerBooks />} />
            <Route path='/cart' element={<Cart />} />

          </Routes>
        </BrowserRouter>
      </NavBarProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
