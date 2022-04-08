import './App.css';
import {  Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Auth/Login/Login"
import { useEffect } from 'react';
// import PrivateRoute from './pages/PrivatePages/PrivateRoute';

function App() {

  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // console.log(location)
    autentica();
  }, [location.pathname])

function autentica(){
  const token = localStorage.getItem("token");
    fetch(`${API_URL}/auth/me`, {
        method: "POST",
        headers: {"Authorization": token}
    }).then((response) => {
        if (response.ok){
            return response.json();
        }
        throw new Error ("Unauthorized");
    })
    .then((json) => {
        const user_id = json._id;
        return (user_id)
    }).catch((error) => {
        localStorage.removeItem("token");
        alert("Token non valido!");
        navigate("/login");
    });
  }
  

  return (
    <div className="App">
        <Routes>
          <Route path='/home' element={
              // <PrivateRoute>
                <Home/>
              // </PrivateRoute>
            }></Route>
          <Route path='/login' element={<Login/>}></Route> 
        </Routes>
    </div>
  );
}

export default App;
