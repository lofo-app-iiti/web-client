import axios from "axios";

const baseURL = "http://localhost:5000";

export const fetchItems = axios.get(baseURL + "/api/items");
export const fetchLofoItems = axios.get(baseURL + "/api/lost-found");