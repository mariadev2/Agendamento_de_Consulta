import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1'
const getAllConsultasUrl = baseUrl + '/getAllConsultas'
const getConsultaByIdUrl = baseUrl + '/getConsultaById'

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