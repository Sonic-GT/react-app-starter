import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API_URL = process.env.REACT_APP_API_URL;

function Login() {
    const [ values, setValues ] = useState({});
    const navigate = useNavigate();

    function submit(event){
        event.preventDefault();
        localStorage.removeItem("token");
        fetch(`${API_URL}/auth/login`, {    //${process.env.REACT_APP_API_URL}  ;  navigate("/home");
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" }
        }).then((res) => res.json())
        .then((json) => {
            const token = json.token;
            localStorage.setItem("token", token)
            navigate("/home")
        });
    }

    function handleChange(event){
        const value = event.target.value;
        const name = event.target.name;
        setValues({ ...values, [name]: value });
        console.log({ ...values, [name]: value });
    }

    return(
        <div className="container">
            <div>
                <form onSubmit={event => submit(event)} >
                    <div className="field">
                        <label>Username</label>
                        <input name = "username" type="text" onChange={event => handleChange(event)}></input>
                    </div>
                    
                    <div className="field">
                        <label>Password</label>
                        <input name = "password" type="password" onChange={event => handleChange(event)}></input>
                    </div>
                    
                    <button>Accedi</button>
                </form>
            </div>
        </div>
    );
}

export default Login;