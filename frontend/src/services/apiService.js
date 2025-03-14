import axios from "axios";

const API_BASE_URL = `http://localhost:5000/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json","Authorization":`Bearer ${localStorage.getItem('token')}` },
});

export const getData = async (endpoint) => {
  const response = await api.get(endpoint);
  return response.data;
};

export const postData = async (endpoint, data) => {
  const response = await api.post(endpoint, data);
  return response.data;
};

export const updateData = async (endpoint,data) => {
  const response = await api.patch(endpoint, data);
  return response.data;
};

export const deleteData = async (endpoint) => {
  const response = await api.delete(endpoint);
  return response.data;
};
