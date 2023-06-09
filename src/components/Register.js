import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";

const RegisterForm = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password.length < 6 || confirmPassword.length < 6) {
            setMessage("Passwords must be at least 6 characters long.")
        }
        if (password === confirmPassword) {
            try {
                const response = await Axios.post('/api/users/register', { username: userName, password: password });
                console.log(response);
                if (response.data.message === "Sign up was successful") {
                    window.localStorage.setItem("Fitness-Trackr-Login", response.data.token);
                    console.log("Login Successful");
                    setMessage("Login Successful");
                    navigate("/");
                    window.location.reload(false);
                }
            } catch (error) {
                console.error(error);
            } 
        } else {
            setMessage("Passwords don't match. Try again.")
        }
    }
    return (
        <div id="register-form">
            <form>
                <label>Username
                    <input type="text" onChange={event => setUserName(event.target.value)} />
                </label>
                <label>Password
                    <input type="text" minLength="6" onChange={event => setPassword(event.target.value)} />
                </label>
                <label>Confirm Password
                    <input type="text" minLength="6" onChange={event => setConfirmPassword(event.target.value)} />
                </label>
            </form>
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}

export default RegisterForm;