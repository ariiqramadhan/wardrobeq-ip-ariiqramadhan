import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://iproject-server.nobuenoo.site'
});

export default instance;