import axios from "axios";

const baseURL = "http://localhost:8002/api/v1";

let headers = {
    "Content-Type":"application/json",
    accept:"application/json",
    "X-Requested-With":"XMLHttpRequest"
};

const options = {
    headers,
    baseURL
};

const Axios = axios.create(options);

Axios.interceptors.request.use(
    function(config) {
        //si se necesita tokenizar el sistema
        const tokenStore = localStorage.getItem('token');
        if (tokenStore) {
            config.headers.accept = "application/json";
            config.headers.Authorization = "Bearer "+tokenStore;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    function(response){
        return response.data;
    }
)

export default Axios;