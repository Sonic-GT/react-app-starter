import { useNavigate } from "react-router";

export function autentica(){
    const API_URL = process.env.REACT_APP_API_URL;

    const token = localStorage.getItem("token");
    fetch(`${API_URL}/auth/me`, {
        method: "POST",
        headers: {"Authorization": token}
    }).then((response) => {
        if (response.ok){
            return response.json();
        }
        throw new Error ("Unauthorized");
    }).then((json) => {
        const user_id = json._id;
        return ({status: user_id})
    }).catch((error) => {
        localStorage.removeItem("token");
        alert("Token scaduto");
        useNavigate("/login");
        return ({status: "error"})
    });
}