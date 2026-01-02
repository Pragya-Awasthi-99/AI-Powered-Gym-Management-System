import axios from "../utils/axios";

export const loginUser = (data) => {
  return axios.post("/auth/login", data, {
    withCredentials: true,
  });
};
