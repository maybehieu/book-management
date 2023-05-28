import logo from './logo.svg';
import './App.css';
import AdminBooks from './components/AdminBooks';
import { useContext } from 'react';
import { AuthContext } from './components/AuthContext';
import CustomerBooks from './components/CustomerBooks';

function App() {
  const { isLoggedIn, isAdmin } = useContext(AuthContext)

  if (isLoggedIn) {
    if (!isAdmin) {
      return (
        <div className="App">
          <CustomerBooks />
        </div>
      );

    }
  }
  return (
    <div className="App">
      <AdminBooks />
    </div>
  );
}

export default App;
