
import axios from "axios";

/* ================================
   Interface
================================ */
export interface ServiceFeature {
  id?: string | number;
  service_id: string;
  feature_title: string;
  feature_description: string;
  is_active: boolean;
}

const API_URL = "http://localhost:5000/service-features";
// const API_URL = "https://68df8fea898434f413581df6.mockapi.io/service_features";

/* ================================
   GET ALL
================================ */
export const fetchAllFeatures = async (): Promise<ServiceFeature[]> => {
  const res = await axios.get<ServiceFeature[]>(API_URL);
  return res.data;
};

/* ================================
   CREATE
================================ */
export const addFeature = async (data: Omit<ServiceFeature, "id">) => {
  const res = await axios.post<ServiceFeature>(API_URL, data);
  return res.data;
};

/* ================================
   UPDATE
================================ */
export const modifyFeature = async (
  id: string,
  data: Omit<ServiceFeature, "id">
) => {
  const res = await axios.put<ServiceFeature>(`${API_URL}/${id}`, data);
  return res.data;
};

/* ================================
   DELETE
================================ */
export const removeFeature = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
