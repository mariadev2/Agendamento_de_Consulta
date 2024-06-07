import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1'
const getAllConsultasUrl = baseUrl + '/getAllConsultas'
const getConsultaByIdUrl = baseUrl + '/getConsultaById'
const singUpConsultaUrl = baseUrl + '/signUpConsulta'

export const getAllConsultas = async (token) =>{
    const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
    try {
        const response = await axios.get(getAllConsultasUrl, config);
        return response.data.content;
      } catch (error) {
        return error.message;
      }
}

export const getConsultaById = async(id, token) =>{
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const response = await axios.post(getConsultaByIdUrl, {id : id}, config);
    return response.data.returnConsulta

  } catch (error) {
    return error.message;
  }
}

export const singUpConsulta = async(token, data) =>{
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const createBody = {
   dataAgendamento: data.dataAgendamento.replace('T', ' '),
   descricaoMotivo: data.descricaoMotivo,
   estadoConsulta: data.estadoConsulta,
   idMedico: data.idMedico,
   idPaciente: data.idPaciente,
   tipoConsulta: data.tipoConsulta,
   descricaoConsulta: 'Não preenchido'
  };

  try {
    const response = await axios.post(singUpConsultaUrl, createBody, config);
    return response.data
  } catch (error) {
    return error.message;
  }

}