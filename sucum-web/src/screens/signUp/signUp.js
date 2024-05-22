import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import './signUp.css';

const SignUp = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    dataNascimento: '',
    senha: '',
    confirmSenha: '',
    cpf: '',
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
    e.preventDefault();
    if (validateForm()) {
      // Aqui você pode adicionar o código para enviar os dados para o servidor.
    }
  };

  return (
    <div className='signUpContainer'>
      <div className='containerForm'>
        <div style={{padding: 40, height: "90%"}}>
          <h2>Vamos iniciar o cadastro</h2>
          <h3>Seja bem vindo paciente</h3>
          <form id="registrationForm" onSubmit={handleSubmit}>
            <div>
                <input type="text" id="name" name="username" placeholder='Nome completo' value={formData.username} onChange={handleChange} />
            </div>
            <div className='cpfContainer'>
              <section>
                {errors.cpf && <p className='labelError'>{errors.cpf}</p>}
                <span>
                  <InputMask mask="999.999.999-99" type="text" id="cpf" name="cpf" onChange={handleChange} value={formData.cpf} placeholder='CPF' title="CPF deve conter 11 dígitos numéricos" required />
                  <input type="date" id="dataNascimento" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} placeholder='Data de Nascimento' />
                </span>
              </section>
            </div>
            <div className='senhaContainer'>
              <section>
                {errors.confirmSenha && <p className='labelError'>{errors.confirmSenha}</p>}
                <span>
                  <input type="password" id="password" name="senha" value={formData.senha} onChange={handleChange} placeholder='Senha' required/>
                  <input type="password" id="confirmSenha" value={formData.confirmSenha} onChange={handleChange} name="confirmSenha" placeholder='Confirme sua Senha' required/>
                </span>
              </section>
            </div>
            <div className='contentCep'>
                <input type="text" id="cep" name="cep" value={formData.cep}  onChange={handleChange} placeholder='CEP' />
                <input type="text" id="endereco" name="endereco" value={formData.endereco}  onChange={handleChange} placeholder='Endereço' />
                <input type="text" id="numeroCasa" name="numeroCasa" value={formData.numeroCasa}  onChange={handleChange} placeholder='N°' />
            </div>
            <div className='contentEmail'>
                <input type="text" id="bairro" name="bairro"  className={errors.email != null ? 'inputErrorCustom' : ''} value={formData.bairro} onChange={handleChange} placeholder='Bairro' />
                <input type="text" id="cidade" className={errors.email != null ? 'inputErrorCustom' : ''} name="cidade" value={formData.cidade} onChange={handleChange} placeholder='Cidade' />
                <span>
                {errors.email && <p className='labelError'>{errors.email}</p>}
                <input type="email" id="email" className='email' name="email" value={formData.email} onChange={handleChange} placeholder='E-mail' />
                </span>
              
            </div>
            <div>
              <InputMask mask="(99) 9999-9999" type="text" id="telefone" value={formData.telefone} name="telefone" onChange={handleChange} placeholder='Telefone' />
              <InputMask mask="(99) 99999-9999" type="text" id="celular" name="celular" value={formData.celular} onChange={handleChange} placeholder='Celular'/>
            </div>
            <div className='containerQuestionario'>
              <h2>Questionário: </h2>
              <div className='contentQuestionario'>
                <p>Possui algum problema de saúde?</p>
                <div>
                  <label htmlFor='sim1'>Sim</label>
                  <input type="checkbox" id="sim1" name="sim" onChange={handlecheckboxChange} />
                </div>
                <div>
                <label htmlFor='nao1'>Não</label>
                <input type="checkbox" id="nao1" name="nao" onChange={handlecheckboxChange} required/>
                </div>
                <input type="text" id="resposta1" name="problemaSaude" value={formData.problemaSaude} onChange={handleChange} placeholder='Se sim, qual?' disabled required/>
              </div>
              <div className='contentQuestionario'>
                <p>Faz uso de algum medicamento?</p>
                <div>
                  <label htmlFor='sim2'>Sim</label>
                  <input type="checkbox" id="sim2" name="sim" onChange={handlecheckboxChange} />
                </div>
                <div>
                <label htmlFor='nao2'>Não</label>
                <input type="checkbox" id="nao2" name="nao" onChange={handlecheckboxChange} required/>
                </div>
                <input type="text" id="resposta2" name="usoMedicamento" value={formData.usoMedicamento} onChange={handleChange} placeholder='Se sim, qual?' disabled required/>
              </div>
              <div className='contentQuestionario'>
                <p>Possui alergia?</p>
                <div>
                  <label htmlFor='sim3'>Sim</label>
                  <input type="checkbox" id="sim3" name="sim" onChange={handlecheckboxChange} />
                </div>
                <div>
                <label htmlFor='nao3'>Não</label>
                <input type="checkbox" id="nao3" name="nao" onChange={handlecheckboxChange} required/>
                </div>
                <input type="text" id="resposta3" name="alergia" value={formData.alergia} onChange={handleChange} placeholder='Se sim, qual?' disabled required/>
              </div>
            </div>
            <button type="submit">Cadastrar</button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default SignUp;