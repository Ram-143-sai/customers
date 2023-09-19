import axios from 'axios';


const BASE_URL = 'http://localhost:8080';

function getCSRFToken() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'XSRF-TOKEN') {
        return decodeURIComponent(value);
      }
    }
    return null;
  }
  
  const csrfToken = getCSRFToken();
  
  const headers = {
    'X-XSRF-TOKEN': csrfToken,
  };

export const userRegister = async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/add`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const userLogin = async (loginData) => {
    axios.post(`${BASE_URL}/user/authenticate`, loginData, { headers })
  .then((response) => {

  })
  .catch((error) => {

  });
  };
  

export const fetchUserData=()=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:808'}/api/v1/auth/userinfo`,
        headers:{
            'Authorization':'Bearer '+getCSRFToken()
        }
    })
}
