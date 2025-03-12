import axios from "axios";
//import 'dotenv/config';


export default axios.create({
    baseURL:  import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Authorization': ``
    }

});

console.log(import.meta.env.VITE_API_BASE_URL)