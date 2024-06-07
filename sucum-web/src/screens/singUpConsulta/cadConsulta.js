import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cadConsulta.css";
import Loading from "../../components/Loading/loading";
import { getAllMedicos } from "../../service/medicoService";
import NavBar from "../../components/Navbar/navbar";
import { singUpConsulta } from "../../service/consultaService";

const SignUpConsulta = () => {
  const [stateLoading, setStateLoading] = useState(false);
  const [stateRequest, setStateRequest] = useState(false);
  const [medicos, setMedicos] = useState([]);
  const [medicosTemp, setMedicosTemp] = useState([]);
  const [labelError, setLabelError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dataAgendamento: "",
    tipoConsulta: "",
    estadoConsulta: "Iniciar",
    idPaciente: localStorage.getItem('id'),
    idMedico: "",
    descricaoMotivo: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    console.log(formData);
  };

  const filtrarMedicos = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    let novosMedicosTemp = [];

    medicos.forEach((el) => {
      if (el.especializacao === value) {
        novosMedicosTemp.push(el);
      }
    });
    setMedicosTemp(novosMedicosTemp);
  };

  const handleSubmit = (e) => {
    setLabelError("");
    const token = localStorage.getItem("tokenAuth");
    e.preventDefault();
    setStateLoading(true);
    singUpConsulta(token, formData).then(e=>{
      setStateLoading(false);
      setStateRequest(true);
      if (e.message !== "Salvo com sucesso") {
        setLabelError(e.message);
      } else {
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    }).catch(e =>{
      setStateLoading(false);
    })
  };

  useEffect(() => {
    setStateRequest(false);
    const token = localStorage.getItem("tokenAuth");
    getAllMedicos(token)
      .then((e) => {
        setMedicos(e.content);
      })
      .catch((e) => {});
  }, [navigate]);
  return (
    <>
      <NavBar isConsulta={false} isAgendarConsulta={true} isPreCad={false} />
      <div className="signUpContainer">
        <div className="containerForm Med">
          <div style={{ padding: 40, height: "90%" }}>
            <h2>Vamos iniciar o cadastro da consulta</h2>
            <h3>Seja bem vindo paciente {}</h3>
            <form id="registrationForm" onSubmit={handleSubmit}>
              <label className="labl area">Área da consulta:</label>
              <div>
                <span>
                  <select
                    id="consulta"
                    name="tipoConsulta"
                    onChange={filtrarMedicos}
                    required
                  >
                    <option name="tipoConsulta" value="" defaultChecked>
                      Selecione a especialidade
                    </option>
                    <option name="tipoConsulta" value="Consulta Geral">
                      Consulta Geral
                    </option>
                    <option name="tipoConsulta" value="Cardiologia">
                      Cardiologia
                    </option>
                    <option name="tipoConsulta" value="Dermatologia">
                      Dermatologia
                    </option>
                    <option name="tipoConsulta" value="Pediatria">
                      Pediatria
                    </option>
                    <option name="tipoConsulta" value="Ginecologia">
                      Ginecologia
                    </option>
                    <option name="tipoConsulta" value="Oftalmologia">
                      Oftalmologia
                    </option>
                    <option name="tipoConsulta" value="Ortopedia">
                      Ortopedia
                    </option>
                    <option name="tipoConsulta" value="Psiquiatria">
                      Psiquiatria
                    </option>
                    <option name="tipoConsulta" value="Neurologia">
                      Neurologia
                    </option>
                    <option name="tipoConsulta" value="Urologia">
                      Urologia
                    </option>
                  </select>
                </span>
                <section
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "15px",
                    position: "relative",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <select
                    id="consulta"
                    name="idMedico"
                    style={{ width: 200 }}
                    required
                    onChange={handleChange}
                  >
                    <option
                      name="especializacao"
                      value=""
                      defaultChecked
                      onChange={handleChange}
                    >
                      Selecione o médico
                    </option>
                    {medicosTemp.length > 0 ? (
                      medicosTemp.map((e) => {
                        return (
                          <option
                            key={e.id}
                            name={formData.idMedico}
                            value={e.id}
                          >
                            {e.username + " - " + e.especializacao}
                          </option>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </select>
                </section>
              </div>
              <div className="cpfContainer">
                <section>
                  <label className="labl">Data de agendamento:</label>
                  <span>
                    <input
                      type="datetime-local"
                      id="dataAgendamento"
                      name="dataAgendamento"
                      value={formData.dataAgendamento}
                      onChange={handleChange}
                      required
                      placeholder="Data de Agendamento"
                    />
                  </span>
                </section>
                <div></div>
              </div>
              <label className="labl area">Clinica:</label>
              <input
                type="text"
                readOnly
                name="local"
                value="Clinica SUCUM"
                style={{ width: "50%" }}
              />
              <label className="labl area">Descrição motivo da consulta:</label>
              <div className="containerMotivo" style={{ width: "90%" }}>
                <textarea
                  value={formData.descricaoMotivo}
                  name="descricaoMotivo"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button name='buttonSend' type="submit">Cadastrar</button>
              {stateLoading === true ? <Loading /> : <div></div>}
              {stateRequest === true ? (
                <h3 id='labelSuccess' style={{ margin: "0 auto" }}>Cadastrado com sucesso</h3>
              ) : (
                <></>
              )}
            </form>
            { labelError !== '' ? (
              <p style={{ textAlign: "center", color: "red" }}>{labelError}</p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpConsulta;
