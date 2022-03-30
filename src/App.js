import './App.css';
import { ReactDOM } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Auth/Login/Login"
import PrivateRoute from './pages/PrivatePages/PrivateRoute';

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={
              // <PrivateRoute>
                <Home/>
              // </PrivateRoute>
            }></Route>
          <Route path='/login' element={<Login/>}></Route> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
