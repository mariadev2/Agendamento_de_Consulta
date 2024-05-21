import React, { useState } from 'react';
import './signUp.css';

const SignUp = () => {

  const [formData, setFormData] = useState({
    username: '',
    cpf: '',
    dataNascimento: '',
    senha: '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handlecheckboxChange1 = (e) => {
    const simCheckbox1 = document.getElementById('sim1');
    const naoCheckbox1 = document.getElementById('nao1');
    const resposta1 = document.getElementById('resposta1');

    if (e.target.id === 'sim1') {
      naoCheckbox1.checked = false;
      resposta1.disabled = false;
    } else if (e.target.id === 'nao1') {
      simCheckbox1.checked = false;
      resposta1.value = '';
      resposta1.disabled = true;
    }
  };

  const handlecheckboxChange2 = (e) => {
    const simCheckbox2 = document.getElementById('sim2');
    const naoCheckbox2 = document.getElementById('nao2');
    const resposta2 = document.getElementById('resposta2');
    
    if (e.target.id === 'sim2') {
      naoCheckbox2.checked = false;
      resposta2.disabled = false;
    } else if (e.target.id === 'nao2') {
      simCheckbox2.checked = false;
      resposta2.value = '';
      resposta2.disabled = true;
    }
  };



  const handlecheckboxChange3 = (e) => {
    const simCheckbox3 = document.getElementById('sim3');
    const naoCheckbox3 = document.getElementById('nao3');
    const resposta3 = document.getElementById('resposta3');
    
    if (e.target.id === 'sim3') {
      naoCheckbox3.checked = false;
      resposta3.disabled = false;
    } else if (e.target.id === 'nao3') {
      simCheckbox3.checked = false;
      resposta3.value = '';
      resposta3.disabled = true;
    }
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name) formErrors.name = 'Nome é obrigatório.';
    if (!formData.cpf ) formErrors.cpf = 'CPF inválido.';
    if (!formData.birthDate) formErrors.birthDate = 'Data de nascimento é obrigatória.';
    if (!formData.password) formErrors.password = 'Senha é obrigatória.';
    if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = 'Senhas não conferem.';
    if (!formData.cep) formErrors.cep = 'CEP é obrigatório.';
    if (!formData.endereco) formErrors.endereco = 'Endereço é obrigatório.';
    if (!formData.numeroCasa) formErrors.numeroCasa = 'Número da casa é obrigatório.';
    if (!formData.bairro) formErrors.bairro = 'Bairro é obrigatório.';
    if (!formData.cidade) formErrors.cidade = 'Cidade é obrigatória.';
    if (!formData.email) formErrors.email = 'E-mail é obrigatório.';
    if (!formData.telefone) formErrors.telefone = 'Telefone é obrigatório.';
    if (!formData.celular) formErrors.celular = 'Celular é obrigatório.';

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (validateForm()) {
      alert('Formulário enviado com sucesso!');
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
                <input type="text" id="name" name="username" placeholder='Nome completo' value={formData.username} onChange={handleChange} required/>
            </div>
            <div>
                <input type="text" id="cpf" name="cpf" required pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" onChange={handleChange} value={formData.cpf} placeholder='CPF' title="CPF deve conter 11 dígitos numéricos"/>
                <input type="date" id="dataNascimento" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} placeholder='Data de Nascimento' required/>
            </div>
            <div>
                <input type="password" id="password" name="senha" value={formData.senha} onChange={handleChange} placeholder='Senha' required/>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder='Confirme sua Senha' required/>
            </div>
            <div className='contentCep'>
                <input type="text" id="cep" name="cep" value={formData.cep}  onChange={handleChange} placeholder='CEP' required/>
                <input type="text" id="endereco" name="endereco" value={formData.endereco}  onChange={handleChange} placeholder='Endereço' required/>
                <input type="text" id="numeroCasa" name="numeroCasa" value={formData.numeroCasa}  onChange={handleChange} placeholder='N°' required/>
            </div>
            <div className='contentEmail'>
                <input type="text" id="bairro" name="bairro" value={formData.bairro} onChange={handleChange} placeholder='Bairro' required/>
                <input type="text" id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} placeholder='Cidade' required/>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder='E-mail' required/>
            </div>
            <div>
                <input type="text" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} placeholder='Telefone' required/>
                <input type="text" id="celular" name="celular" value={formData.celular} onChange={handleChange} placeholder='Celular' required/>
            </div>
            <div className='containerQuestionario'>
              <h2>Questionário: </h2>
              <div className='contentQuestionario'>
                <p>Possui algum problema de saúde?</p>
                <div>
                  <label htmlFor='sim1'>Sim</label>
                  <input type="checkbox" id="sim1" name="sim" onChange={handlecheckboxChange1} />
                </div>
                <div>
                <label htmlFor='nao1'>Não</label>
                <input type="checkbox" id="nao1" name="nao" onChange={handlecheckboxChange1}/>
                </div>
                <input type="text" id="resposta1" name="problemaSaude" value={formData.problemaSaude} onChange={handleChange} placeholder='Se sim, qual?' disabled/>
              </div>
              <div className='contentQuestionario'>
                <p>Faz uso de algum medicamento?</p>
                <div>
                  <label htmlFor='sim2'>Sim</label>
                  <input type="checkbox" id="sim2" name="sim" onChange={handlecheckboxChange2} />
                </div>
                <div>
                <label htmlFor='nao2'>Não</label>
                <input type="checkbox" id="nao2" name="nao" onChange={handlecheckboxChange2} />
                </div>
                <input type="text" id="resposta2" name="usoMedicamento" value={formData.usoMedicamento} onChange={handleChange} placeholder='Se sim, qual?' disabled/>
              </div>
              <div className='contentQuestionario'>
                <p>Possui alergia?</p>
                <div>
                  <label htmlFor='sim3'>Sim</label>
                  <input type="checkbox" id="sim3" name="sim" onChange={handlecheckboxChange3} />
                </div>
                <div>
                <label htmlFor='nao3'>Não</label>
                <input type="checkbox" id="nao3" name="nao" onChange={handlecheckboxChange3} />
                </div>
                <input type="text" id="resposta3" name="alergia" value={formData.alergia} onChange={handleChange} placeholder='Se sim, qual?' disabled/>
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