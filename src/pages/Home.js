import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const navigate=useNavigate();
    const API_URL = "http://localhost:5000";
    
    // const [jwt, setJwt] = useState(null);

    function autentica(){
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
            console.log(json._id);
            const user_id = json._id;
            return (user_id)
        }).catch((error) => {
            navigate("/login");
        });
    }

    // function eventHandler(){
    //     setJwt(localStorage.getItem("token") || null)
    // }

    // useEffect(() => {
    //     setJwt(localStorage.getItem("token") || null)
    //     window.addEventListener("storage", eventHandler, false)
    //     console.log("Test");
    // }, [])

    autentica();

    return(
        <div>
            <h1>Test Home</h1>
        </div>
    );
}

export default Home;