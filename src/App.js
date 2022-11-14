import './App.css';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Header from './components/Layout/DefaultLayout/Header/Header';
import DefaultLayout from './components/Layout/DefaultLayout';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  // Link
} from "react-router-dom";
import Home from './pages/Home';
import Users from './pages/users/Users';
import Vouchers from './pages/voucher/vouchers';
import Admins from './pages/admins/Admins';
import Stores from './pages/stores/Stores';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route exact="true" path="/" element={<><Header/><Home /></>}></Route>      
          <Route path="/login" element={<Login/>}></Route>
          <Route path='/dashboard' element={<DefaultLayout><Dashboard/></DefaultLayout>}></Route>
          <Route path='/users' element={<DefaultLayout><Users/></DefaultLayout>}></Route>
          <Route path='/vouchers' element={<DefaultLayout><Vouchers/></DefaultLayout>}></Route>
          <Route path='/admins' element={<DefaultLayout><Admins/></DefaultLayout>}></Route>
          <Route path='/stores' element={<DefaultLayout><Stores/></DefaultLayout>}></Route>
          {/* <Route path='/store/food/updateFood/' element={<DefaultLayout><CreateFood/></DefaultLayout>}></Route> */}       
        </Routes>      
      </BrowserRouter>
      </>
  );
}

export default App;