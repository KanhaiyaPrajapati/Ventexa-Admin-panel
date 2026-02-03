// store/api/process-steps-api.ts
import axios from "axios";

const BASE_URL = "https://69784290cd4fe130e3d84c74.mockapi.io/steps-api";

export interface ProcessStep {
  id?: string;
  step_number: number;
  title: string;
  description: string;
  is_active: boolean;
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllProcessSteps = async (): Promise<ProcessStep[]> => {
  const res = await api.get<ProcessStep[]>("/");
  return res.data;
};

export const getProcessStep = async (id: string): Promise<ProcessStep> => {
  const res = await api.get<ProcessStep>(`/${id}`);
  return res.data;
};

export const createProcessStep = async (
  data: ProcessStep
): Promise<ProcessStep> => {
  const res = await api.post<ProcessStep>("/", data);
  return res.data;
};

export const updateProcessStep = async (
  id: string,
  data: ProcessStep
): Promise<ProcessStep> => {
  const res = await api.put<ProcessStep>(`/${id}`, data);
  return res.data;
};

export const deleteProcessStep = async (id: string): Promise<void> => {
  await api.delete(`/${id}`);
};