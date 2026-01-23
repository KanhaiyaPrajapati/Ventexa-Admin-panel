import axios from "axios";

const API_URL = "http://localhost:5000/contactLeads";

export interface ContactLead {
  id?: number;
  name: string;
  email: string;
  message: string;
  status: "new" | "contacted";
  created_at: string;
}

/** GET ALL */
export const getContactLeads = async (): Promise<ContactLead[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

/** CREATE */
export const createContactLead = async (
  data: Omit<ContactLead, "id" | "created_at">
): Promise<ContactLead> => {
  const response = await axios.post(API_URL, {
    ...data,
    status: "new",
    created_at: new Date().toISOString(),
  });
  return response.data;
};

/** UPDATE (PATCH) */
export const updateContactLead = async (
  
  id: number,
  data: Partial<Omit<ContactLead, "id" | "created_at">>
): Promise<ContactLead> => {
  const response = await axios.patch(`${API_URL}/${id}`, data);
  return response.data;
};

/** DELETE */
export const deleteContactLead = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
