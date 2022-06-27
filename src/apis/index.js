import axios from "axios";

const baseURL = "https://lofo-server.herokuapp.com";
// const baseURL = "http://localhost:5000";

export const googleLogin = (googleToken) => axios.post(baseURL + '/api/googlelogin', { googleToken })
export const fetchItems = axios.get(baseURL + "/api/items");
export const fetchLofoItems = axios.get(baseURL + "/api/lost-found");