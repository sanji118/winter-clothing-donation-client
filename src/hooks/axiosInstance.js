import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const {response} = error;

        if(response && (response.status === 401 || response.status === 403)){
            console.warn('Auth error : token may be expired or invalid');
            window.location.href = '/auth';
        }

        return Promise.reject(error);
    }
)

export default axiosInstance;
