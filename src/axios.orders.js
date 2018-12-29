import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-7ddd1.firebaseio.com/'
});

export default instance;