import axios  from 'axios'
import { KEY_ACCESS_TOKEN1 } from '../common/constanst';
import { manageLocalStorage1 } from '../common/utils/local-storage1';


const BASE_URL1 = "http://movieapi.cyberlearn.vn";

export const  axiosWithAuth1 = axios.create({
    
        baseURL:BASE_URL1,
        timeout:60*30*1000,
})

export  const axiosWithout1 = axios.create({
        baseURL :BASE_URL1,
        timeout:60*30*1000,
})
axiosWithAuth1.interceptors.request.use((config) => {
        config.headers.set(
                "Authorization",
                `Bearer ${manageLocalStorage1.get(KEY_ACCESS_TOKEN1)}`
        )
        return config;

})