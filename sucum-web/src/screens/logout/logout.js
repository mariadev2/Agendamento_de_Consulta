import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../login/login.css';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        navigate('/login')
    }, [navigate])
    
    
    return (
        <div className='loginContainer'>
        </div>
    );
};

export default Logout;