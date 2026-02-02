
import axios from "axios";

export interface ServiceFeature {
  id?: string | number;
  title: string;
  slug: string;
  short_description: string;
  is_active: boolean;
}

const API_URL = "https://697d82c597386252a2684fc3.mockapi.io/categories-api";


export const fetchAllFeatures = async (): Promise<ServiceFeature[]> => {
  const res = await axios.get<ServiceFeature[]>(API_URL);
  return res.data;
};

export const addFeature = async (data: Omit<ServiceFeature, "id">) => {
  const res = await axios.post<ServiceFeature>(API_URL, data);
  return res.data;
};


export const modifyFeature = async (
  id: string,
  data: Omit<ServiceFeature, "id">
) => {
  const res = await axios.put<ServiceFeature>(`${API_URL}/${id}`, data);
  return res.data;
};


export const removeFeature = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};

