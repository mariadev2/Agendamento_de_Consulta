import { isExpired } from "react-jwt";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Skeleton from "../../components/Skeleton/skeleton";
import NavBar from "../../components/Navbar/navbar";
import doctorIcon from '../../assets/doctor.png'
import { getAllConsultas } from "../../service/consultaService";

import './home.css'
import { getMedicoById } from "../../service/preSignUpMedico";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [labelError, setLabelError] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('tokenAuth');
    const expired = isExpired(token);
    if (expired) {
      localStorage.clear();
      navigate('/login');
    }
  }, [navigate]);



  const fetchData = async () => {
    const token = localStorage.getItem('tokenAuth');
    const response = await getAllConsultas(token);
    if (response !== 'Network Error') {
      setData(response);
      setLoading(false);
    } else {
      setData([]);
      setLabelError('Serviço indisponivel')
      setLoading(false);
    }

  }

  const checkMedicoInfos = async () => {
    const profile = localStorage.getItem('profile');
    const token = localStorage.getItem('tokenAuth');
    const id = localStorage.getItem('id');
    if (profile === "Medico") {
      const response = await getMedicoById(id, token);
      if (response !== "Network Error") {
        console.log(response.data[0].isActive);
        if (response.data[0].isActive === true) {
          setLoading(false);
        }else{
          navigate('/login')
          alert('Verificamos que você nao completou o seu cadastro, por favor, preencha os campos')
        }
      } else {
        setData([]);
        setLabelError("Serviço indisponivel");
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    checkMedicoInfos()
    fetchData()
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <div className="sectionYellow"></div>
      <div className="containerHome"></div>
      <NavBar isConsulta={true} isAgendarConsulta={false} isPreCad={false}/>
      <div className="contentText">
        <span>
          <div></div>
          <p>Sobre nós</p>
        </span>
        <h2>SUCUM</h2>
        <p>
          Bem-vindo a nossa aplicação de agendamento de consultas! Com nossa
          plataforma, você pode facilmente marcar e gerenciar suas consultas
          médicas de forma rápida e conveniente. Não importa se você precisa de
          uma consulta com um médico geral, um especialista ou até mesmo um
          exame, estamos aqui para ajudar a simplificar o processo.
        </p>
      </div>
      <section className="contentConsultas">
        <p className="title">Histórico de consultas</p>
        <div className="boxResult">
          {loading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <>
              {data.length > 0 ? (
                data.map((e) => (
                  <div className="cardConsulta" key={e.id}>
                    <img src={doctorIcon} alt="doctor icon" />
                    <div className="contentDescription">
                      <p>{e.tipoConsulta}</p>
                      <p>Médico SUCUM</p>
                      <p>{e.dataAgendamento}</p>
                      <p>Fulano</p>
                      <p className="state">{e.estadoConsulta}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ width: "100%" }}>
                  {labelError.length > 0 ? (
                    <p className="listEmpty">{labelError}</p>
                  ) : (
                    <p className="listEmpty">
                      Ainda não temos consultas cadastradas!
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <div className="contentHelp"></div>
    </div>
  );
};

export default Home;