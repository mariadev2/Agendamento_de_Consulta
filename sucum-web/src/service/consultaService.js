import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1'
const getAllConsultasUrl = baseUrl + '/getAllConsultas'

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
        return error.response;
      }
}