import axios from "axios";

const BASE_URL = "https://68df8fea898434f413581df6.mockapi.io/service_features";

export interface ServiceFeature {
  id?: string;
  service_id: string;
  feature_title: string;
  feature_description: string;
  is_active: boolean;
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// GET all features
export const getAllServiceFeatures = async (): Promise<ServiceFeature[]> => {
  const res = await api.get<ServiceFeature[]>("/");
  return res.data;
};

// CREATE new feature
export const createServiceFeature = async (
  data: ServiceFeature
): Promise<ServiceFeature> => {
  const res = await api.post<ServiceFeature>("/", data);
  return res.data;
};

// UPDATE feature by ID
export const updateServiceFeature = async (
  id: string,
  data: ServiceFeature
): Promise<ServiceFeature> => {
  const res = await api.put<ServiceFeature>(`/${id}`, data);
  return res.data;
};

// DELETE feature by ID
export const deleteServiceFeature = async (id: string): Promise<void> => {
  await api.delete(`/${id}`);
};
