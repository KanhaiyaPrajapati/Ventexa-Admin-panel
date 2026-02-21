import axios from "axios";

/* ================================
   Interface
================================ */
export interface TeamMember {
  id?: string | number;
  full_name: string;
  designation: string;
  bio: string;
  profile_image: string;
  linkedin_url: string;
  is_active: boolean;
}

/* ================================
   API BASE
================================ */
const API_URL =
  "https://697d82c597386252a2684fc3.mockapi.io/team-api";

/* ================================
   GET ALL
================================ */
export const fetchAllTeamMembers = async (): Promise<TeamMember[]> => {
  const res = await axios.get<TeamMember[]>(API_URL);
  return res.data;
};

/* ================================
   GET ONE (optional but useful)
================================ */
export const fetchTeamMemberById = async (
  id: string | number
): Promise<TeamMember> => {
  const res = await axios.get<TeamMember>(`${API_URL}/${id}`);
  return res.data;
};

/* ================================
   CREATE
================================ */
export const addTeamMember = async (
  data: Omit<TeamMember, "id">
): Promise<TeamMember> => {
  const res = await axios.post<TeamMember>(API_URL, data);
  return res.data;
};

/* ================================
   UPDATE
================================ */
export const updateTeamMember = async (
  id: string | number,
  data: Omit<TeamMember, "id">
): Promise<TeamMember> => {
  const res = await axios.put<TeamMember>(`${API_URL}/${id}`, data);
  return res.data;
};

/* ================================
   DELETE
================================ */
export const deleteTeamMember = async (
  id: string | number
): Promise<boolean> => {
  await axios.delete(`${API_URL}/${id}`);
  return true;
};
