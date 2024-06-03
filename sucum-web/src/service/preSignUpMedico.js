import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1'
const preSignUpPacienteUrl = baseUrl + '/preSignUpMedico'
const getMedicoByIdUrl = baseUrl + '/getMedicoById'

export const preSignUpService = async (data) =>{
    const createBody = {
      username: data.username ?? "",
      senha: data.senha ?? "",
      crm: data.crm ?? "",
      cpf: data.cpf ?? ''
    };
  
    try {
      const response = await axios.post(preSignUpPacienteUrl, createBody);
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
