import Axios from "axios"

class AxiosCaller {
    constructor() {
        this.client = Axios.create({
            baseURL: "http://localhost:8000/api/"
        });


         // Add a request interceptor
         this.client.interceptors.request.use(function (config) {
            // Do something before request is sent
            const token = localStorage.getItem('token')
            if (token) {
                config.headers.Authorization =  `Bearer ${token}`;
            }
            
             return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
    }
    /**
      * @description Axios get request
      * @param {*} url url for request
      * @returns  axios promisr
      */
    get(url) {
        return this.client.get(url)
    }

    /**
  * @description axios post request
  * @param {*} url  for requst
  * @param {*} data to post
  * @returns 
  */
    post(url, data) {
        return this.client.post(url, data)
    }

}


const axiosCaller = new AxiosCaller()

export default axiosCaller