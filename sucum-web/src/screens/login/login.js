import React, { useState, useEffect } from 'react';
import { loginService } from '../../service/loginService';
import { Link, useNavigate } from "react-router-dom";
import userLogin from '../../assets/img-login.png'
import { isExpired } from "react-jwt";
import './login.css';

const Login = () => {
   
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [labelError, setLabelError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
         const token = localStorage.getItem('tokenAuth');
         const expired = isExpired(token);
         if (expired) {
            navigate('/login');
         }
    }, [navigate])
    
    const handleLoginChange = (e) => {
        setLabelError('')
        setLogin(e.target.value);
    };

    const handlesenhaChange = (e) => {
        setLabelError('')
        setSenha(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            'username': login,
            'senha': senha
        }
        if (login != null && senha != null) {
            const result  = await loginService(data);
            if (result) {
                switch (result.status) {
                    case 200:
                            localStorage.setItem('tokenAuth', result.data.tokenJWT)
                            localStorage.setItem('perfil', result.data.perfil)
                            navigate('/');
                            setLabelError('')
                        break;
                    case 401:
                            setLabelError(result.data.message)
                        break;
                    case 404 || 500:
                            setLabelError("Serviço indisponivel")
                        break;
                
                    default:
                        break;
                }
            } 
        }
    };
    
    return (
        <div className='loginContainer'>
            <div className='formContainer'>
                <div className='userContainer'>
                    <div>
                        <img src={userLogin} alt='imgLogin'/>
                    </div>
                <h2 className='title'>Entrar</h2>
                <h2 className='subtitle'>Seja bem vindo</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1em' }}>
                        <input
                            type="text"
                            id="login"
                            value={login}
                            placeholder='Nome'
                            onChange={handleLoginChange}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '1em' }}>
                        <input
                            type="senha"
                            id="senha"
                            value={senha}
                            placeholder='Senha'
                            onChange={handlesenhaChange}
                            required
                        />
                    </div>
                    <div className='actionsLogin'>
                        <Link to="/signUp" className='signUp'>Cadastre-se</Link>
                    </div>
                    <button type="submit" style={{ padding: '.5em 1em' }}>Entrar</button>
                    { labelError.length > 0 
                        ? <p className='labelError'>{labelError}</p> 
                        : <div></div>
                    }
                </form>
            </div>
        </div>
    );
};

export default Login;