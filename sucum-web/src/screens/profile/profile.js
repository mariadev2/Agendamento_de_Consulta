import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './profile.css';
import Loading from '../../components/Loading/loading';
import NavBar from '../../components/Navbar/navbar';
import { getMedicoById } from '../../service/medicoService';
import maleIcon from '../../assets/man.png'
import womanIcon from '../../assets/woman.png'
import { getPacienteById } from '../../service/userService';
import { getSupervisorById } from '../../service/supervisorService';

const Profile = () => {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState('')
  const [sexo, setSexo] = useState('')
  const [stateLoading, setStateLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    dataNascimento: '',
    senha: '',
    confirmSenha: '',
    cpf: '',
    sexo: '',
    crm: '',
    cep: '',
    endereco: '',
    numeroCasa: '',
    bairro: '',
    cidade: '',
    email: '',
    telefone: '',
    especializacao: '',
    celular: '',
    problemaSaude: '',
    usoMedicamento: '',
    alergia: ''
  });
  

  useEffect(() => {
    const profile = localStorage.getItem('profile');
    const sexo = localStorage.getItem('sexo');
    setSexo(sexo);
    setPerfil(profile);
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('tokenAuth');
    setStateLoading(true)
    switch (profile) {
        case 'Medico':
            getMedicoById(id, token).then(data =>{
                setStateLoading(false)
                if (data.status !== 401) {
                    setData(data)
                }else {
                    setStateLoading(false)
                    navigate('/logout')
                }
            });
            
            break;
        case 'Paciente':
            getPacienteById(id, token).then(data =>{
              setStateLoading(false)
              if (data.status !== 401) {
                  setData(data)
              }else {
                  setStateLoading(false)
                  navigate('/logout')
              }
          });
            break;
        case 'Supervisor':
            getSupervisorById(id, token).then(data =>{
              setStateLoading(false)
              if (data.status !== 401) {
                  setData(data)
              }else {
                  setStateLoading(false)
                  navigate('/logout')
              }
          });
            break;
    
        default:
            break;
    }
    setFormData({
      username: '',
      dataNascimento: '',
      senha: '',
      confirmSenha: '',
      cpf: '',
      sexo: '',
      cep: '',
      endereco: '',
      numeroCasa: '',
      bairro: '',
      crm: '',
      cidade: '',
      email: '',
      telefone: '',
      celular: '',
      especializacao: '',
      problemaSaude: '',
      usoMedicamento: '',
      alergia: ''
    })
  }, [navigate])

  function setData(data) {
    setFormData({
      username: data.data[0].username != null ? `Nome: ${data.data[0].username}` : 'Nome: Não cadastrado',
      cpf: data.data[0].cpf != null ? `CPF: ${data.data[0].cpf}` : 'CPF: Não cadastrado',
      dataNascimento: data.data[0].dataNascimento != null ? `Data Nascimento: ${data.data[0].dataNascimento}` : 'Data Nascimento: Não cadastrado',
      senha: data.data[0].senha != null ? `Senha: ${data.data[0].senha}` : 'Senha: Não cadastrado',
      sexo: data.data[0].sexo != null ? `Sexo: ${data.data[0].sexo}` : 'Sexo: Não cadastrado',
      cep: data.data[0].cep != null ? `CEP: ${data.data[0].cep}` : 'CEP: Não cadastrado',
      endereco: data.data[0].endereco != null ? `Endereço: ${data.data[0].endereco}` : 'Endereço: Não cadastrado',
      numeroCasa: data.data[0].numeroCasa != null ? `N°: ${data.data[0].numeroCasa}` : 'N°: Não cadastrado',
      bairro: data.data[0].bairro != null ? `Bairro: ${data.data[0].bairro}` : 'Bairro: Não cadastrado',
      cidade: data.data[0].cidade != null ? `Cidade: ${data.data[0].cidade}` : 'Cidade: Não cadastrado',
      crm :data.data[0].crm != null ? `CRM: ${data.data[0].crm}` : 'CRM: Não cadastrado',
      email: data.data[0].email != null ? `E-mail: ${data.data[0].email}` : 'E-mail: Não cadastrado',
      telefone: data.data[0].telefone != null ? `Telefone: ${data.data[0].telefone}` : 'Telefone: Não cadastrado',
      celular: data.data[0].celular != null ? `Celular: ${data.data[0].celular}` : 'Celular: Não cadastrado',
      especializacao: data.data[0].especializacao != null ? `Especialização: ${data.data[0].especializacao}` : 'Especialização: Não cadastrado',
      alergia: data.questionario != null ? data.questionario[0].alergia != null ? data.questionario[0].alergia : '' : '',
      problemaSaude: data.questionario != null ? data.questionario[0].problemaSaude != null ? data.questionario[0].problemaSaude : '' : '',
      usoMedicamento: data.questionario != null ? data.questionario[0].usoMedicamento != null ? data.questionario[0].usoMedicamento: '' : '',
  })
  }
  

  return (
    <>
      <NavBar isConsulta={false} isAgendarConsulta={false} isPreCad={false} />
      <div className="signUpContainer">
        <div className={`containerForm ${perfil === 'Paciente' ? 'paciente' : ''}`}>
          {stateLoading ? (
            <Loading />
          ) : (
            <div style={{ padding: 40, height: "90%" }}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {sexo === "Masculino" ? (
                  <img src={maleIcon} width={200} alt="icon-men" />
                ) : (
                  <img src={womanIcon} width={200} alt="icon-woman" />
                )}
                <h3>Seja bem vindo {formData.username.replace('Nome:', '')}</h3>
              </div>
              <form id="registrationForm" style={{ marginTop: "50px" }}>
                <div>
                  <input
                    type="text"
                    id="name"
                    name="username"
                    placeholder="Nome completo"
                    value={formData.username}
                    readOnly={true}
                  />
                </div>
                <div className="cpfContainer">
                  <section>
                    <span>
                      <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        placeholder="CPF"
                        title="CPF deve conter 11 dígitos numéricos"
                        readOnly={true}
                      />
                      <input
                        style={{ width: "40%" }}
                        type="text"
                        id="dataNascimento"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        placeholder="Data de Nascimento"
                        readOnly={true}
                      />
                      {perfil=== 'Medico' ? <input
                        style={{ width: "40%" }}
                        type="text"
                        id="crm"
                        name="crm"
                        value={formData.crm}
                        placeholder="CRM"
                        readOnly={true}
                      /> : <></>}
                    </span>
                  </section>
                </div>
                <div className="senhaContainer">
                  <section>
                    <span>
                      <input
                        type="password"
                        id="password"
                        minLength="8"
                        title="Insira no mínimo 8 caracteres"
                        name="senha"
                        value={formData.senha}
                        readOnly={true}
                        placeholder="Senha"
                      />
                      <div className="contentSexo">
                        <div style={{ alignItems: "center" }}>
                          <label
                            htmlFor="masculino"
                            style={{
                              color: "#fff",
                              fontFamily: "sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            Masculino:
                          </label>
                          <input
                            type="checkbox"
                            value={formData.sexo}
                            style={{ margin: "unset", padding: "unset" }}
                            id="masculino"
                            name="sexo"
                            checked={true}
                            readOnly={true}
                          />
                        </div>
                        <div style={{ alignItems: "center" }}>
                          <label
                            htmlFor="feminino"
                            style={{
                              color: "#fff",
                              fontFamily: "sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            Feminino:
                          </label>
                          <input
                            type="checkbox"
                            value={formData.sexo}
                            readOnly={true}
                            style={{ margin: "unset", padding: "unset" }}
                            id="feminino"
                            name="sexo"
                            disabled
                          />
                        </div>
                      </div>
                    </span>
                  </section>
                </div>
                <div className="contentCep">
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    value={formData.cep}
                    placeholder="CEP"
                    readOnly={true}
                  />
                  <input
                    type="text"
                    id="endereco"
                    name="endereco"
                    value={formData.endereco}
                    placeholder="Endereço"
                    readOnly={true}
                  />
                  <input
                    type="text"
                    id="numeroCasa"
                    name="numeroCasa"
                    value={formData.numeroCasa}
                    placeholder="N°"
                    readOnly={true}
                  />
                </div>
                <div className="contentEmail">
                  <input
                    type="text"
                    id="bairro"
                    name="bairro"
                    readOnly={true}
                    value={formData.bairro}
                    placeholder="Bairro"
                  />
                  <input
                    type="text"
                    id="cidade"
                    readOnly={true}
                    name="cidade"
                    value={formData.cidade}
                    placeholder="Cidade"
                  />
                  <span>
                    <input
                      type="email"
                      id="email"
                      className="email"
                      name="email"
                      value={formData.email}
                      readOnly={true}
                      placeholder="E-mail"
                    />
                  </span>
                </div>
                <div>
                  <input
                    type="text"
                    id="telefone"
                    value={formData.telefone}
                    name="telefone"
                    placeholder="Telefone"
                    readOnly={true}
                  />
                  <input
                    type="text"
                    id="celular"
                    name="celular"
                    value={formData.celular}
                    placeholder="Celular"
                    readOnly={true}
                  />
                  {perfil === "Medico" ? (
                    <input
                      type="text"
                      id="especializacao"
                      name="especializacao"
                      value={formData.especializacao}
                      placeholder="especializacao"
                      readOnly={true}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                {perfil === "Paciente" ? (
                  <div className="containerQuestionario">
                    <h2>Questionário: </h2>
                    <div className="contentQuestionario">
                      <p>Possui algum problema de saúde?</p>
                      <div className="contentBoxs">
                        <div>
                          <label htmlFor="sim1">Sim</label>
                          <input
                            type="checkbox"
                            id="sim1"
                            name="sim"
                            checked={formData.problemaSaude !== '' ? true : false}
                            readOnly={true}
                          />
                        </div>
                        <div>
                          <label htmlFor="nao1">Não</label>
                          <input
                            type="checkbox"
                            id="nao1"
                            checked={formData.problemaSaude.length > 0 ? false : true}
                            name="nao"
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        id="resposta1"
                        name="problemaSaude"
                        value={formData.problemaSaude}
                        readOnly={true}
                        placeholder="Se sim, qual?"
                      />
                    </div>
                    <div className="contentQuestionario">
                      <p>Faz uso de algum medicamento?</p>
                      <div className="contentBoxs">
                        <div>
                          <label htmlFor="sim2">Sim</label>
                          <input
                            type="checkbox"
                            id="sim2"
                            checked={formData.usoMedicamento !== '' ? true : false}
                            name="sim"
                            readOnly={true}
                          />
                        </div>
                        <div>
                          <label htmlFor="nao2">Não</label>
                          <input
                            type="checkbox"
                            id="nao2"
                            name="nao"
                            checked={formData.usoMedicamento.length > 0  ? false : true}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        id="resposta2"
                        name="usoMedicamento"
                        value={formData.usoMedicamento}
                        readOnly={true}
                        placeholder="Se sim, qual?"
                      />
                    </div>
                    <div className="contentQuestionario">
                      <p>Possui alergia?</p>
                      <div className="contentBoxs">
                        <div>
                          <label htmlFor="sim3">Sim</label>
                          <input
                            type="checkbox"
                            id="sim3"
                            checked={formData.alergia !== '' ? true : false}
                            name="sim"
                            readOnly={true}
                          />
                        </div>
                        <div>
                          <label htmlFor="nao3">Não</label>
                          <input
                            type="checkbox"
                            id="nao3"
                            name="nao"
                            checked={formData.alergia.length > 0 ? false : true}
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        id="resposta3"
                        name="alergia"
                        value={formData.alergia}
                        readOnly={true}
                        placeholder="Se sim, qual?"
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                <button type="submit" disabled>
                  Editar
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;