import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1'
const preSignUpMedicoUrl = baseUrl + '/preSignUpMedico'
const getMedicoByIdUrl = baseUrl + '/getMedicoById'
const signUpMedicoUrl = baseUrl + '/updateMedico'
const getAllMedicosUrl = baseUrl + '/getAllMedicos'

export const preSignUpService = async (data) =>{
    const createBody = {
      username: data.username ?? "",
      senha: data.senha ?? "",
      crm: data.crm ?? "",
      cpf: data.cpf ?? ''
    };
  
    try {
      const response = await axios.post(preSignUpMedicoUrl, createBody);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  export const getMedicoById = async (data, token) =>{
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const createBody = {
     id: data ?? "",
    };
  
    try {
      const response = await axios.post(getMedicoByIdUrl, createBody, config);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }

export const signUpMedService = async (data, id, token) =>{
    
    const createBody = {
      id: id,
      dataNascimento: data.dataNascimento ?? "",
      celular: data.celular?? "",
      numeroCasa: data.numeroCasa ?? "",
      bairro: data.bairro ?? '',
      cidade: data.cidade ?? '',
      email: data.email ?? '',
      cep: data.cep ?? '',
      sexo: data.sexo ?? '',
      especializacao: data.especializacao ?? ''
    };

    const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
   
  
    try {
      const response = await axios.post(signUpMedicoUrl, createBody, config);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  export const getAllMedicos = async ( token) =>{
    const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
   
  
    try {
      const response = await axios.get(getAllMedicosUrl, config);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }

