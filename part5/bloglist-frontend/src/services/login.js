import axios from 'axios'
const baseUrl = '/api/login'


const login = async credentials => {
    console.log("logging in");
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { login }