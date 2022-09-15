import axios from "axios";

export const api = axios.create({
  baseURL: "https://cg-rocketmovies-api.herokuapp.com/",
});
