import Header from "./Header";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('user-info'))
        {
            navigate("/login");
        }
    }, []);

    let user = JSON.parse(localStorage.getItem('user-info'));
    localStorage.clear();
}
export default Logout;