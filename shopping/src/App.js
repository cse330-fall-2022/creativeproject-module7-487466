import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import NewItem from './NewItem'
import Register from './Register'
import Logout from './Logout';
import ViewItems from './ViewItems';
import UpdateItem from './UpdateItem';
import Item from './Item';
import Profile from "./Profile";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="add" element={<NewItem />} />
          <Route path="logout" element={<Logout />} />
          <Route path="newUser" element={<Register />} />
          <Route path="" element={<ViewItems />} />
          <Route path="update/:item" element={<UpdateItem />} />
          <Route path=":item" element={<Item />} />
          <Route path="profile" element={<Profile />} />

        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
