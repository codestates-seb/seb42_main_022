import axios from "axios";

const localtoken = localStorage.token;
const BASE_URL = "http://3.39.150.26:8080";

// 기본 헤더없는 요청
const axiosApi = (url: string) => {
  const instance = axios.create({ baseURL: url });
  return instance;
};

// 토큰 인증 요청
const axiosAuthApi = (url: string) => {
  const token = localStorage.token;
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: token },
  });
  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
