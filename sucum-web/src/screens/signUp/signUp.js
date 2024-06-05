import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from "react-router-dom";
import './signUp.css';
import { signUpService } from '../../service/userService';
import Loading from '../../components/Loading/loading';

const SignUp = () => {
  const [errors, setErrors] = useState({});
  const [stateLoading, setStateLoading] = useState(false);
  const [stateRequest, setStateRequest] = useState(false);
  const [labelError, setLabelError] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    cidade: '',
    email: '',
    telefone: '',
    celular: '',
    problemaSaude: '',
    usoMedicamento: '',
    alergia: ''
  });
  

  const validateForm = () => {
    let formErrors = {};
    if (formData.cpf.length < 11) formErrors.cpf = 'CPF deve conter 11 dígitos numéricos.';
    if (formData.senha !== formData.confirmSenha) formErrors.confirmSenha = 'Senhas não conferem.';
    if (!validateEmail(formData.email)) formErrors.email = 'E-mail inválido.'

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    setErrors({});
    if (e.target.id === 'cpf') {
      let value = e.target.value.replace(/\D/g, '');
      setFormData({ ...formData, [e.target.name]: value });
    } else if(e.target.id === 'cep'){
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 5) {
          value = value.slice(0, 5) + '-' + value.slice(5, 8);
        }
        setFormData({ ...formData, [e.target.name]: value });
    } else if (e.target.id === 'telefone'){
        let value = e.target.value.replace(/\D/g, '');
        setFormData({ ...formData, [e.target.name]: value });
    } else if (e.target.id === 'celular'){
        let value = e.target.value.replace(/\D/g, '');
        setFormData({ ...formData, [e.target.name]: value });
    }  else if (e.target.id === 'endereco'){
        let value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
        setFormData({ ...formData, [e.target.name]: value });
    }  else if (e.target.id === 'cidade'){
        let value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
        setFormData({ ...formData, [e.target.name]: value });
    } else if (e.target.id === 'bairro'){
        let value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
        setFormData({ ...formData, [e.target.name]: value });
    } else if (e.target.id === 'numeroCasa'){
        let value = e.target.value.replace(/\D/g, '');
        setFormData({ ...formData, [e.target.name]: value });
    } else{
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
  };
  
  const handlecheckboxChange = (e) => {
    const simCheckbox1 = document.getElementById('sim1');
    const naoCheckbox1 = document.getElementById('nao1');
    const resposta1 = document.getElementById('resposta1');
    const simCheckbox2 = document.getElementById('sim2');
    const naoCheckbox2 = document.getElementById('nao2');
    const resposta2 = document.getElementById('resposta2');
    const simCheckbox3 = document.getElementById('sim3');
    const naoCheckbox3 = document.getElementById('nao3');
    const resposta3 = document.getElementById('resposta3');
    const masculino = document.getElementById('masculino');
    const feminino = document.getElementById('feminino');
    const { name } = e.target;

    if (e.target.id === 'masculino') {
      feminino.checked = false;
      setFormData({ ...formData, [name]: 'Masculino' });
    }else if(e.target.id === 'feminino'){
      masculino.checked = false;
      setFormData({ ...formData, [name]: 'Feminino' });
    }

    if (e.target.id === 'sim1') {
      naoCheckbox1.removeAttribute('required')
      naoCheckbox1.checked = false;
      resposta1.disabled = false;
    } else if (e.target.id === 'nao1') {
      simCheckbox1.checked = false;
      resposta1.value = '';
      resposta1.disabled = true;
    }

    if (e.target.id === 'sim2') {
      naoCheckbox2.removeAttribute('required')
      naoCheckbox2.checked = false;
      resposta2.disabled = false;
    } else if (e.target.id === 'nao2') {
      simCheckbox2.checked = false;
      resposta2.value = '';
      resposta2.disabled = true;
    }

    if (e.target.id === 'sim3') {
      naoCheckbox3.removeAttribute('required')
      naoCheckbox3.checked = false;
      resposta3.disabled = false;
    } else if (e.target.id === 'nao3') {
      simCheckbox3.checked = false;
      resposta3.value = '';
      resposta3.disabled = true;
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    setLabelError('');
    e.preventDefault();
    if (validateForm()) {
      setStateLoading(true)
    signUpService(formData).then((e)=>{
      if (e.status === 200) {
        setStateLoading(false)
        setStateRequest(true)
        setTimeout(() => {
          navigate('/');
        }, 2);
      }else{
        setStateLoading(false)
        setLabelError(e.data.message)
      }
    }).catch((e)=>{
      setStateLoading(false)
      setLabelError('Erro no cadastro, tente novamente mais tarde')
    })
    }
  };

  useEffect(() => {
    setStateRequest(false);
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
      cidade: '',
      email: '',
      telefone: '',
      celular: '',
      problemaSaude: '',
      usoMedicamento: '',
      alergia: ''
    })
  }, [navigate])
  

  return (
    <div className="signUpContainer">
      <div className="containerForm">
        <div style={{ padding: 40, height: "90%" }}>
          <h2>Vamos iniciar o cadastro</h2>
          <h3>Seja bem vindo paciente</h3>
          <form id="registrationForm" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                id="name"
                name="username"
                placeholder="Nome completo"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="cpfContainer">
              <section>
                {errors.cpf && <p className="labelError">{errors.cpf}</p>}
                <span>
                  <InputMask
                    mask="999.999.999-99"
                    type="text"
                    id="cpf"
                    name="cpf"
                    onChange={handleChange}
                    value={formData.cpf}
                    placeholder="CPF"
                    title="CPF deve conter 11 dígitos numéricos"
                    required
                  />
                  <input
                    type="date"
                    id="dataNascimento"
                    name="dataNascimento"
                    required
                    value={formData.dataNascimento}
                    onChange={handleChange}
                    placeholder="Data de Nascimento"
                  />
                </span>
              </section>
            </div>
            <div className="senhaContainer">
              <section>
                {errors.confirmSenha && (
                  <p className="labelError">{errors.confirmSenha}</p>
                )}
                <span>
                  <input
                    type="password"
                    id="password"
                    minLength="8"
                    title="Insira no mínimo 8 caracteres"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="Senha"
                    required
                  />
                  <input
                    type="password"
                    id="confirmSenha"
                    title="Insira no mínimo 8 caracteres"
                    minLength="8"
                    value={formData.confirmSenha}
                    onChange={handleChange}
                    name="confirmSenha"
                    placeholder="Confirme sua Senha"
                    required
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
                        onChange={handlecheckboxChange}
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
                        style={{ margin: "unset", padding: "unset" }}
                        id="feminino"
                        name="sexo"
                        onChange={handlecheckboxChange}
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
                onChange={handleChange}
                placeholder="CEP"
                required
              />
              <input
                type="text"
                id="endereco"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                placeholder="Endereço"
                required
              />
              <input
                type="text"
                id="numeroCasa"
                name="numeroCasa"
                value={formData.numeroCasa}
                onChange={handleChange}
                placeholder="N°"
                required
              />
            </div>
            <div className="contentEmail">
              <input
                type="text"
                id="bairro"
                name="bairro"
                className={errors.email != null ? "inputErrorCustom" : ""}
                value={formData.bairro}
                onChange={handleChange}
                placeholder="Bairro"
                required
              />
              <input
                type="text"
                id="cidade"
                className={errors.email != null ? "inputErrorCustom" : ""}
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                placeholder="Cidade"
                required
              />
              <span>
                {errors.email && <p className="labelError">{errors.email}</p>}
                <input
                  type="email"
                  id="email"
                  className="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                />
              </span>
            </div>
            <div>
              <InputMask
                mask="(99) 9999-9999"
                type="text"
                id="telefone"
                value={formData.telefone}
                name="telefone"
                onChange={handleChange}
                placeholder="Telefone"
                required
              />
              <InputMask
                mask="(99) 99999-9999"
                type="text"
                id="celular"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                placeholder="Celular"
                required
              />
            </div>
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
                      onChange={handlecheckboxChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="nao1">Não</label>
                    <input
                      type="checkbox"
                      id="nao1"
                      name="nao"
                      onChange={handlecheckboxChange}
                      required
                    />
                  </div>
                </div>
                <input
                  type="text"
                  id="resposta1"
                  name="problemaSaude"
                  value={formData.problemaSaude}
                  onChange={handleChange}
                  placeholder="Se sim, qual?"
                  disabled
                  required
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
                      name="sim"
                      onChange={handlecheckboxChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="nao2">Não</label>
                    <input
                      type="checkbox"
                      id="nao2"
                      name="nao"
                      onChange={handlecheckboxChange}
                      required
                    />
                  </div>
                </div>
                <input
                  type="text"
                  id="resposta2"
                  name="usoMedicamento"
                  value={formData.usoMedicamento}
                  onChange={handleChange}
                  placeholder="Se sim, qual?"
                  disabled
                  required
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
                      name="sim"
                      onChange={handlecheckboxChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="nao3">Não</label>
                    <input
                      type="checkbox"
                      id="nao3"
                      name="nao"
                      onChange={handlecheckboxChange}
                      required
                    />
                  </div>
                </div>
                <input
                  type="text"
                  id="resposta3"
                  name="alergia"
                  value={formData.alergia}
                  onChange={handleChange}
                  placeholder="Se sim, qual?"
                  disabled
                  required
                />
              </div>
            </div>
            <button type="submit">Cadastrar</button>
            {stateLoading === true ? <Loading /> : <div></div>}
            {stateRequest === true ? (
              <h3 style={{ margin: "0 auto" }}>Cadastrado com sucesso</h3>
            ) : (
              <div></div>
            )}
          </form>
          {labelError.length > 0 ? (
          <p style={{'textAlign': 'center', 'color': 'red'}}>{labelError}</p>
        ) : (
          <></>
        )}
        </div>
        
      </div>
    </div>
  );
};

export default SignUp;