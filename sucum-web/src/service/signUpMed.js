import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1'
const signUpMedicoUrl = baseUrl + '/updateMedico'


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
