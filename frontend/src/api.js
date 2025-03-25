import axios from "axios";




const apiConnection = axios.create({
    baseURL:  import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Authorization': ``
    }
});

apiConnection.interceptors.request.use(
    
    (config) => {
        
        const token = localStorage.getItem("token");
        
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        
            /*
        } else{
            window.location.href="/";
        */
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiConnection;