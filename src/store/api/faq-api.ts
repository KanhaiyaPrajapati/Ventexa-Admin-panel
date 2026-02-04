import axios from "axios";

const BASE_URL = "https://697c83dd889a1aecfeb2adf0.mockapi.io/faq-api";

export interface FAQ {
  id?: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllFAQs = async (): Promise<FAQ[]> => {
  const res = await api.get<FAQ[]>("/");
  return res.data;
};

export const getFAQ = async (id: string): Promise<FAQ> => {
  const res = await api.get<FAQ>(`/${id}`);
  return res.data;
};

export const createFAQ = async (data: FAQ): Promise<FAQ> => {
  const res = await api.post<FAQ>("/", data);
  return res.data;
};

export const updateFAQ = async (id: string, data: FAQ): Promise<FAQ> => {
  const res = await api.put<FAQ>(`/${id}`, data);
  return res.data;
};

export const deleteFAQ = async (id: string): Promise<void> => {
  await api.delete(`/${id}`);
};