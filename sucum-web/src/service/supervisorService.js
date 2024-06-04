import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1'
const getSupervisorByIdUrl = baseUrl + '/getSupervisorById'

export const getSupervisorById = async (data, token) =>{
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const createBody = {
     id: data ?? "",
    };
  
    try {
      const response = await axios.post(getSupervisorByIdUrl, createBody, config);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
