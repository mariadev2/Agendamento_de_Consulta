import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1'
const loginUrl = baseUrl + '/login'

export const loginService = async (data) =>{
    try {
        const response = await axios.post(loginUrl, data);
        return response;
      } catch (error) {
        return error.response;
      }
}
    