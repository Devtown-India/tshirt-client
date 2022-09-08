import axios from 'axios'

export default axios.create({
    // baseURL: 'https://t-shirt-server-devtown.herokuapp.com/api/v1',
    baseURL: 'http://localhost:8080/api/v1',

})