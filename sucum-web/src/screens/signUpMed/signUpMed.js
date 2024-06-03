import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from "react-router-dom";
import './signUpMed.css';
import Loading from '../../components/Loading/loading';
import { signUpMedService } from '../../service/signUpMed';

const SignUpMed = () => {
  const [errors, setErrors] = useState({});
  const [stateLoading, setStateLoading] = useState(false);
  const [stateRequest, setStateRequest] = useState(false);
  const [labelError, setLabelError] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dataNascimento: '',
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
    especializacao: '',
  });
  

  const validateForm = () => {
    let formErrors = {};
    if (formData.sexo.length === 0) formErrors.sexo = 'Selecione uma opção'
    if(formData.especializacao.length === 0) formErrors.especializacao = 'Selecione uma especialização'
    if (!validateEmail(formData.email)) formErrors.email = 'E-mail inválido.'

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    setErrors({});
     if(e.target.id === 'cep'){
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
  

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  
  const handlecheckboxChange = (e) => {
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
  };

  const handleSubmit = (e) => {
    setLabelError('');
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('tokenAuth');
    e.preventDefault();
    if (validateForm()) {
      setStateLoading(true)
    signUpMedService(formData, id, token).then((e)=>{
      if (e.status === 200) {
        setStateLoading(false)
        setStateRequest(true)
        setTimeout(() => {
          navigate('/');
        }, 2000);
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
      sexo: '',
      cep: '',
      endereco: '',
      numeroCasa: '',
      bairro: '',
      cidade: '',
      email: '',
      telefone: '',
      celular: '',
      especializacao: '',
    })
  }, [navigate])
  

  return (
    <div className="signUpContainer">
      <div className="containerForm Med">
        <div style={{ padding: 40, height: "90%" }}>
          <h2>Vamos iniciar o cadastro</h2>
          <h3>Seja bem vindo paciente</h3>
          <form id="registrationForm" onSubmit={handleSubmit}>
            <div>
            <span style={{'width': '50%'}}>
                {errors.email && <p className="labelError">{errors.email}</p>}
                <input
                  type="email"
                  id="email"
                  className="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                  required
                />
              </span>
              <section style={{'display': 'flex', 'alignItems': 'center', 'marginLeft': '15px', 'position': 'relative', 'flexDirection': 'column', 'justifyContent': 'center'}}>
              {errors.sexo && (
                  <p className="labelError" style={{'position': 'relative', 'left': '-70px'}}>{errors.sexo}</p>
                )}
                <span>
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
            <div className="cpfContainer">
              <section>
                <span>
                  <input
                    type="date"
                    id="dataNascimento"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                    required
                    placeholder="Data de Nascimento"
                  />
                </span>
                
              </section>
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
            </div>
            <div className="senhaContainer">
              
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
              <select id="consulta" name="especializacao" onChange={handleChange} required>
                <option name="especializacao" value="" defaultChecked>Selecione a especialidade</option>
                <option name="especializacao" value="Consulta Geral">Consulta Geral</option>
                <option name="especializacao" value="Cardiologia">Cardiologia</option>
                <option name="especializacao" value="Dermatologia">Dermatologia</option>
                <option name="especializacao" value="Pediatria">Pediatria</option>
                <option name="especializacao" value="Ginecologia">Ginecologia</option>
                <option name="especializacao" value="Oftalmologia">Oftalmologia</option>
                <option name="especializacao" value="Ortopedia">Ortopedia</option>
                <option name="especializacao" value="Psiquiatria">Psiquiatria</option>
                <option name="especializacao" value="Neurologia">Neurologia</option>
                <option name="especializacao" value="Urologia">Urologia</option>
              </select>
            </div>
            
            
            <button type="submit">Cadastrar</button>
            {stateLoading === true ? <Loading /> : <div></div>}
            {stateRequest === true ? 
              <h3 style={{ margin: "0 auto" }}>Cadastrado com sucesso</h3>
             : 
              <></>
            }
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

export default SignUpMed;