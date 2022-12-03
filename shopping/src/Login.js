import Header from './Header';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/add");
        }
    }, []);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    async function login() {
        //alert(username + " " + password);
        let item = { username, password };
        console.warn(item);

        let result = await fetch("http://localhost:8000/api/login", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if(result.username == "error") {
            alert("username or password incorrect");
            navigate("/login");
        }
        else{
            localStorage.setItem("user-info", JSON.stringify(result));
            navigate("/viewitems");
        }

    }

    return (
        <div className="register_format">
            <Header />
            <h1>Log In Page</h1>
            Username: <br />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="username" placeholder="username" />
            <br /> Password: <br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="password" placeholder="password" />
            <div className='register_button'>
                <Button onClick={login} className='register'>Login</Button>
            </div>
        </div>
    );
}
export default Login;