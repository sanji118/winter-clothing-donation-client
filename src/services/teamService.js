import axiosInstance from "../hooks/axiosInstance";

export const getTeam = async () => {
  const res = await axiosInstance.get("/team");
  return res.data;
};

export const getTeamMemberById = async (id) => {
  const res = await axiosInstance.get(`/team/${id}`);
  return res.data;
};

export const createTeamMember = async (data) => {
  const res = await axiosInstance.post("/team", data);
  return res.data;
};

export const updateTeamMember = async (id, data) => {
  const res = await axiosInstance.patch(`/team/${id}`, data);
  return res.data;
};

export const deleteTeamMember = async (id) => {
  const res = await axiosInstance.delete(`/team/${id}`);
  return res.data;
};
