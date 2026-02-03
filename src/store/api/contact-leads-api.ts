
import axios from "axios";

const BASE_URL = "https://697c83dd889a1aecfeb2adf0.mockapi.io/contact-lead";

export interface ContactLead {
  id?: string;
  name: string;
  email: string;
  message: string;
  status: "new" | "contacted";
  created_at: string;
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllContactLeads = async (): Promise<ContactLead[]> => {
  const res = await api.get<ContactLead[]>("/");
  return res.data;
};

export const getContactLead = async (id: string): Promise<ContactLead> => {
  const res = await api.get<ContactLead>(`/${id}`);
  return res.data;
};

// ADD THIS CREATE FUNCTION
export const createContactLead = async (
  data: ContactLead
): Promise<ContactLead> => {
  const res = await api.post<ContactLead>("/", data);
  return res.data;
};

export const updateContactLead = async (
  id: string,
  data: ContactLead
): Promise<ContactLead> => {
  const res = await api.put<ContactLead>(`/${id}`, data);
  return res.data;
};

export const deleteContactLead = async (id: string): Promise<void> => {
  await api.delete(`/${id}`);
};


