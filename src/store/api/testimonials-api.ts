import axios from "axios";

const BASE_URL = "https://69784290cd4fe130e3d84c74.mockapi.io/testimonial";

export interface Testimonial {
  created_at: any;
  id?: string;
  client_name: string;
  company_name: string;
  testimonial_text: string;
  rating: number; // 1-5
  is_active: boolean;
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllTestimonials = async (): Promise<Testimonial[]> => {
  const res = await api.get<Testimonial[]>("/");
  return res.data;
};

export const getTestimonial = async (id: string): Promise<Testimonial> => {
  const res = await api.get<Testimonial>(`/${id}`);
  return res.data;
};

export const createTestimonial = async (
  data: Testimonial
): Promise<Testimonial> => {
  const res = await api.post<Testimonial>("/", data);
  return res.data;
};

export const updateTestimonial = async (
  id: string,
  data: Testimonial
): Promise<Testimonial> => {
  const res = await api.put<Testimonial>(`/${id}`, data);
  return res.data;
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  await api.delete(`/${id}`);
};

export default {
  getAllTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};