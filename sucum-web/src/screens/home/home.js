import { isExpired } from "react-jwt";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import maleIcon from '../../assets/man.png'
import womanIcon from '../../assets/woman.png'
import './home.css'

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState('');
  const [sexo, setSexo] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('tokenAuth');
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
    const expired = isExpired(token);
    if (expired) {
      localStorage.clear();
      navigate('/login');
    }
}, [navigate])

  return (
    <div style={{'height': '100vh'}} >
      <div className="sectionYellow"></div>
      <div className="containerHome"></div>
      <div className="navBar">
        <div className="navBarOptions">
          {profile === 'Medico' ? <p>NOVO MEDICO</p> : null}
          <p className="active">CONSULTAS</p>
          <p>AGENDAR</p>
        </div>
        <div className="iconProfile">
          <img src={sexo === 'Masculino' ? maleIcon : womanIcon} alt="Icon User"/>
          <p>{username}</p>
        </div>
      </div>
      <div className="contentText">
        <span>
          <div></div>
          <p>Sobre nós</p>
        </span>
        <h2>SUCUM</h2>
        <p> 
            Bem-vindo a nossa aplicação de agendamento de consultas! 
            Com nossa plataforma, você pode facilmente marcar e gerenciar suas 
            consultas médicas de forma rápida e conveniente. Não importa se você
            precisa de uma consulta com um médico geral, um especialista ou até
            mesmo um exame, estamos aqui para ajudar a simplificar o processo. 
        </p>
      </div>
      <section className="contentConsultas"></section>
      <div className="contentHelp"></div>
    </div>
  );
};

export default Home;