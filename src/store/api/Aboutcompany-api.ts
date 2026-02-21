import axios from "axios";

const API_BASE_URL = "https://68df8fea898434f413581df6.mockapi.io/about-company";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

  export interface AboutCompany {
  id?: string; 
  _id?: string; 
  company_overview: string;
  mission: string;
  vision: string;
  core_values: string;
  founded_year: number | string;
  headquarters: string;
}

export const getAllcompanies = async (): Promise<AboutCompany[]> => {
  const res = await api.get("/");
  return res.data;
};

export const getCompanyById = async (id: string): Promise<AboutCompany> => {
  const res = await api.get(`/${id}`);
  return res.data;
};

export const createCompany = async (data: AboutCompany): Promise<AboutCompany> => {
  const res = await api.post("/", data);
  return res.data;
};

export const updateCompany = async (id: string, data: AboutCompany): Promise<AboutCompany> => {
  const res = await api.put(`/${id}`, data);
  return res.data;
};

export const deleteCompany = async (id: string): Promise<void> => {
  await api.delete(`/${id}`);
};

export default api;