import React, { useState, useEffect } from 'react';
import { isExpired } from "react-jwt";
import { useNavigate, useParams } from "react-router-dom";
import './consulta.css';
import Loading from '../../components/Loading/loading';
import NavBar from '../../components/Navbar/navbar';
import { getConsultaById} from '../../service/consultaService'
import maleIcon from '../../assets/man.png'
import womanIcon from '../../assets/woman.png'

const ConsultaView = () => {
  
  const [stateLoading, setStateLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    sexo: '',
  });
  const [doctor, setDoctor] = useState({
    username: '',
    sexo: '',
  })
  const [consulta, setConsulta] = useState({
    dataAgendamento: '',
    tipoConsulta: '',
    local: 'Clinica SUCUM',
    descricaoMotivo: '',
    descricaoConsulta: '',
    estadoConsulta: ''
  })

  const checkConsultaInfo = async () => {
    const token = localStorage.getItem('tokenAuth');
    setStateLoading(true)
    await getConsultaById(id, token).then(e =>{
      setStateLoading(false);
      if (e === 'Request failed with status code 400') {
         alert('Consulta não encontrada')
         return navigate('/home')
      }else{
        setUser({username: e.paciente.username, sexo: e.paciente.sexo})
        setDoctor({username: e.medico.username, sexo: e.medico.sexo})
        setConsulta({
          dataAgendamento: e.consulta.dataAgendamento,
          tipoConsulta: e.consulta.tipoConsulta,
          local: 'Clinica SUCUM',
          descricaoMotivo: e.consulta.descricaoMotivo,
          descricaoConsulta: e.consulta.descricaoConsulta,
          estadoConsulta: e.consulta.estadoConsulta,
        })
      }
    }).catch(e =>{
      setStateLoading(false);
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('tokenAuth');
    const expired = isExpired(token);
    if (expired) {
      localStorage.clear();
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    checkConsultaInfo();
    setUser({
      username: "",
      sexo: "",
    });
    setDoctor({ 
      username: '', 
      sexo: '',
    });
    setConsulta({
      dataAgendamento: '',
      tipoConsulta: '',
      local: 'Clinica SUCUM',
      descricaoMotivo: '',
      descricaoConsulta: '',
      estadoConsulta: ''
    })
    // eslint-disable-next-line
  }, [navigate])
  

  return (
    <>
      <NavBar isConsulta={false} isAgendarConsulta={false} isPreCad={false} />
      <div className="signUpContainer">
        <div className="containerForm consulta">
          {stateLoading ? (
            <Loading />
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                {user.sexo === "Masculino" ? (
                  <img src={maleIcon} width={200} alt="icon-men" />
                ) : (
                  <img src={womanIcon} width={200} alt="icon-woman" />
                )}
                <h3>Paciente: {user.username.replace("Nome:", "")}</h3>
              </div>
              <div style={{ padding: 40, height: "90%" }}>
                <h2>Consulta Médica</h2>
                <h3>Informações da consulta:</h3>
                <form id="registrationForm">
                  <div>
                    <input
                      type="text"
                      id="name"
                      name="username"
                      placeholder="Nome doutor"
                      value={
                        doctor.sexo === "Masculino"
                          ? `Doutor: ${doctor.username}`
                          : `Doutora: ${doctor.username}`
                      }
                      readOnly
                    />
                  </div>
                  <div className="senhaContainer">
                    <section>
                      <span>
                        <input
                          type="text"
                          id="password"
                          minLength="8"
                          name="senha"
                          placeholder="Senha"
                          required
                          readOnly
                          value={`Data agendamento: ${consulta.dataAgendamento}`}
                        />
                        <input
                          type="text"
                          id="confirmSenha"
                          minLength="8"
                          placeholder="Tipo consulta"
                          required
                          readOnly
                          value={`Tipo consulta: ${consulta.tipoConsulta}`}
                        />
                      </span>
                    </section>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="name"
                      name="username"
                      placeholder="Nome doutor"
                      value={`Local consulta: ${consulta.local}`}
                      readOnly
                    />
                  </div>
                  <div>
                    <div style={{ flexDirection: "column" }}>
                      <p
                        style={{
                          color: "#fff",
                          fontSize: "15px",
                          fontWeight: "bold",
                          fontFamily: "sans-serif",
                        }}
                      >
                        Andamento da consulta
                      </p>
                      <div className="containerEstado">
                        <div className="inputRadio">
                          <label htmlFor="rd1">Iniciar</label>
                          <input
                            id="rd1"
                            type="radio"
                            readOnly
                            checked={
                              consulta.estadoConsulta === "Iniciar"
                                ? true
                                : false
                            }
                          />
                        </div>
                        <div className="inputRadio">
                          <label htmlFor="rd1">Em andamento</label>
                          <input
                            id="rd1"
                            type="radio"
                            readOnly
                            checked={
                              consulta.estadoConsulta === "Em andamento"
                                ? true
                                : false
                            }
                          />
                        </div>
                        <div className="inputRadio">
                          <label htmlFor="rd1">Finalizada</label>
                          <input
                            id="rd1"
                            type="radio"
                            readOnly
                            checked={
                              consulta.estadoConsulta === "Finalizada"
                                ? true
                                : false
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div style={{ flexDirection: "column" }}>
                      <p
                        style={{
                          color: "#fff",
                          fontSize: "15px",
                          fontWeight: "bold",
                          fontFamily: "sans-serif",
                        }}
                      >
                        Motivo da consulta
                      </p>
                      <div className="containerMotivo">
                        <textarea
                          readOnly
                          value={consulta.descricaoMotivo}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div style={{ flexDirection: "column" }}>
                    <p
                      style={{
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: "bold",
                        fontFamily: "sans-serif",
                      }}
                    >
                      Conclusão Médica
                    </p>
                    <div className="containerMotivo" style={{ width: "90%" }}>
                      <textarea
                        readOnly
                        value={consulta.descricaoConsulta}
                      ></textarea>
                    </div>
                  </div>
                  <span style={{ gap: 20, display: "flex", margin: "0 auto" }}>
                    {doctor.username === localStorage.getItem("username") ? (
                      <button type="submit" disabled>
                        Editar consulta
                      </button>
                    ) : (
                      <></>
                    )}

                    <button type="submit" disabled>
                      Gerar Relatorio
                    </button>
                  </span>
                  {stateLoading === true ? <Loading /> : <div></div>}
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ConsultaView;