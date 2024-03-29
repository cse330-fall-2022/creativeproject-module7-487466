import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from "./Header";

function Register() {
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/");
        }
    }, []);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    async function signup() {
        //alert(username + " " + password);
        let item = { username, password };
        console.warn(item);

        let result = await fetch("http://localhost:8000/api/register", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        result = await result.json();
        alert("account created");
        navigate("/login");
    }
    return (
        <div className="register_format">
            <Header />
            <h1>Create New User</h1>
            Username: <br />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="username" placeholder="username" />
            <br /> Password: <br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="password" placeholder="password" />
            <div className='register_button'>
                <Button onClick={signup} className='register'>Sign Up</Button>
            </div>
        </div>
    );
}
export default Register;