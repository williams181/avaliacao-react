import axios from "axios";

const api = axios.create({
  baseURL: `http://10.0.0.53:5000/`
});

export default api
