import axios from 'axios'

const instance = axios.create({
    baseURL:'https://react-burger-builder-312c8.firebaseio.com/'
})

export default instance;