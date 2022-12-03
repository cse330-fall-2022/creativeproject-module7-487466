import './App.css';
import Button from 'react-bootstrap/Button';
import Header from './Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import NewItem from './NewItem'
import Register from './Register'
import Logout from './Logout';
import ViewItems from './ViewItems';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="add" element={<NewItem />} />
          <Route path="logout" element={<Logout />} />
          <Route path="newUser" element={<Register />} />
          <Route path="viewitems" element={<ViewItems />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
