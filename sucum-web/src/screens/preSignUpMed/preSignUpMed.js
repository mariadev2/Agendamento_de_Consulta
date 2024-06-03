import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import InputMask from 'react-input-mask';
import './preSignUpMed.css';
import Loading from '../../components/Loading/loading';
import NavBar from '../../components/Navbar/navbar';
import { preSignUpService } from '../../service/preSignUpMedico';

const PreSignUpMed = () => {
  const [errors, setErrors] = useState({});
  const [stateLoading, setStateLoading] = useState(false);
  const [stateRequest, setStateRequest] = useState(false);
  const [labelError, setLabelError] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    senha: '',
    confirmSenha: '',
    cpf: '',
    crm: '',
  });

  const validateForm = () => {
    let formErrors = {};
    if (formData.crm.length < 9) formErrors.crm = 'CRM deve conter 6 dígitos numéricos.';
    if (formData.senha !== formData.confirmSenha) formErrors.confirmSenha = 'Senhas não conferem.';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    setErrors({});
    if (e.target.id === 'cpf') {
      let value = e.target.value.replace(/\D/g, '');
      setFormData({ ...formData, [e.target.name]: value });
    }else if (e.target.id === 'crm') {
      let value = e.target.value.replace(/\D/g, '');
      setFormData({ ...formData, [e.target.name]: value = 'CRM' + value.slice(0, 6)});
    } else{
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    setLabelError('');
    e.preventDefault();
     if (validateForm()) {
       setStateLoading(true)
    preSignUpService(formData).then((e)=>{
      if (e.status === 200) {
        setStateLoading(false)
        setStateRequest(true)
        setTimeout(() => {
          navigate('/');
        }, 5000);
      }else{
        setStateLoading(false)
        setLabelError(e.data.message ?? 'Erro servidor')
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
      senha: '',
      confirmSenha: '',
      cpf: '',
      crm: '',
    })
  }, [navigate])
  

  return (
    <>
      <NavBar isConsulta={false} isAgendarConsulta={false} isPreCad={true} />
      <div className="signUpContainer">
        <div className="containerForm preSignUp">
          <div style={{ padding: 40, height: "90%" }}>
            <h2>Vamos iniciar o pré-cadastro do médico</h2>
            <h3>Seja bem vindo supervisor</h3>
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

                <span>
                  <input
                    type="text"
                    id="crm"
                    name="crm"
                    onChange={handleChange}
                    value={formData.crm}
                    maxLength="9"
                    placeholder="CRM______"
                    title="crm deve conter 11 dígitos numéricos"
                    required
                  />
                  {errors.crm && <p className="labelError">{errors.crm}</p>}
                </span>
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
                  </span>
                </section>
              </div>
              <button type="submit">Cadastrar</button>
              {stateLoading === true ? <Loading /> : <div></div>}
              {stateRequest === true ? (
                <h3 style={{ margin: "0 auto" }}>Cadastrado com sucesso</h3>
              ) : (
                <></>
              )}
            </form>
            {labelError.length > 0 ? (
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

export default PreSignUpMed;