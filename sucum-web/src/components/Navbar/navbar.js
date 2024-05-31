import './navbar.css'; 
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import maleIcon from '../../assets/man.png'
import womanIcon from '../../assets/woman.png'
import logo from '../../assets/logo.jpg'

const NavBar = () => {
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [sexo, setSexo] = useState('');
    const [scrolled, setScrolled] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
      };
      
    useEffect(() => {
        const getProfile = localStorage.getItem('profile');
        const getUsername = localStorage.getItem('username');
        const getSexo = localStorage.getItem('sexo');
        if (getSexo != null) {
          setSexo(getSexo);
        }
        if (getProfile != null) {
          setProfile(getProfile);
        }
        if (getUsername != null) {
          setUsername(getUsername);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
          const offset = window.scrollY;
          if (offset > 50) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        
        // Limpar o evento de rolagem ao desmontar o componente
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
  return (
    <div className={`navBar ${scrolled ? 'scrolled': ''}`}>
        <img className="logo" src={logo} alt="logo"/>
        <div className="navBarOptions">
          {profile === 'Medico' ? <p>NOVO MEDICO</p> : null}
          <p className="active">CONSULTAS</p>
          {profile === 'Paciente' ? <p>AGENDAR</p> : null}
        </div>
        <button className="iconProfile" onClick={toggleVisibility}>
          <img src={sexo === 'Masculino' ? maleIcon : womanIcon} alt="Icon User"/>
          <p>{username}</p>
        </button>
        {isVisible && (
        <div className={`containerProfile ${isVisible ? 'show' : 'hide'}`} >
          <Link style={{'margin-top': 40}}>Conta</Link>
          <Link to='/login' onClick={localStorage.clear()}>Sair</Link>
        </div>
      )}
      </div>
  );
};

export default NavBar;