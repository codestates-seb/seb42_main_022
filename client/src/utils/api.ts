import axios from "axios";

// const localtoken = localStorage.token;

export const fetchCreate = (url: string, data: string) => {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).catch((error) => {
    console.error("Error", error);
  });
};
export const fetchPatch = (url: string, id: string, data: string) => {
  fetch(`${url}${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(data),
  })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error", error);
    });
};
export const fetchPut = (url: string, id: string, data: string) => {
  fetch(`${url}${id}`, {
    method: "PUT",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(data),
  })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error", error);
    });
};

const BASE_URL = "http://3.39.150.26:8080";
// 기본 헤더없는 요청
const axiosApi = (url: string) => {
  const instance = axios.create({ baseURL: url });
  return instance;
};
// 토큰 인증 요청
const axiosAuthApi = (url: string) => {
  // const token = localtoken;
  const instance = axios.create({
    baseURL: url,
    // headers: { Authorization: "Bearer " + token },
  });
  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
