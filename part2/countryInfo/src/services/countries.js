import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    //console.log(request)
    return request.then(response => response.data)
}



export default {getAll}

