import axios from 'axios'

export default axios.create({
    baseURL: 'https://t-shirt-server-devtown.herokuapp.com/api/v1',
})