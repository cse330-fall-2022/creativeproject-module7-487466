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

    localStorage.clear();
}
export default Logout;