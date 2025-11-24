import axiosInstance from "../utils/axios.js";

const REST_API_BASE_URL = "http://localhost:8080/api/auth";

export const signup = (companySignupRequest) => {
  return axiosInstance.post(`${REST_API_BASE_URL}/signup`, companySignupRequest);
};

export const login = (companyLoginRequest) => {
  return axiosInstance.post(`${REST_API_BASE_URL}/login`, companyLoginRequest);
};

console.log("AuthService loaded!", { signup, login });