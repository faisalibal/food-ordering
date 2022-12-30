import axios from "axios";

export const apiJsonServer = axios.create({
  baseURL: import.meta.env.VITE_APP_BASEURL,
});
