import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1'
const loginUrl = baseUrl + '/login'
const signUpPacienteUrl = baseUrl + '/signUpPaciente'

export const loginService = async (data) =>{
    try {
        const response = await axios.post(loginUrl, data);
        return response;
      } catch (error) {
        return error.message;
      }
}

export const signUpService = async (data) =>{
  const createBody = {
    "paciente":{
        "username": data.username ?? '',
        "senha": data.senha ?? '',
        "dataNascimento": data.dataNascimento ?? '',
        "bairro": data.bairro ?? '',
        "cep": data.cep ?? '',
        "celular": data.celular ?? '',
        "cidade": data.cidade ?? '',
        "cpf": data.cpf ?? '',
        "numeroCasa": data.numeroCasa ?? undefined,
        "sexo": data.sexo ?? '',
        "email": data.email ?? ''
    },
    "questionario":{
      "problemaSaude": data.problemaSaude ?? '',
      "usoMedicamento": data.usoMedicamento ?? '',
      "alergia": data.alergia ?? ''
    }
  }

  try {
    const response = await axios.post(signUpPacienteUrl, createBody);
    return response;
  } catch (error) {
    return error.response;
  }

  
}
    