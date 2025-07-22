import axiosInstance from "../hooks/axiosInstance";

export const getVolunteers = async () => {
  const res = await axiosInstance.get("/volunteers");
  return res.data;
};

export const getVolunteerById = async (id) => {
  const res = await axiosInstance.get(`/volunteers/${id}`);
  return res.data;
};

export const createVolunteer = async (data) => {
  const res = await axiosInstance.post("/volunteers", data);
  return res.data;
};

export const updateVolunteer = async (id, data) => {
  const res = await axiosInstance.patch(`/volunteers/${id}`, data);
  return res.data;
};

export const deleteVolunteer = async (id) => {
  const res = await axiosInstance.delete(`/volunteers/${id}`);
  return res.data;
};
