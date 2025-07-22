import axiosInstance from "../hooks/axiosInstance";

export const getUsers = async () => {
  const res = await axiosInstance.get("/users");
  return res.data;
};

export const getUserById = async (id) => {
  const res = await axiosInstance.get(`/users/${id}`);
  return res.data;
};

export const createUser = async (data) => {
  const res = await axiosInstance.post("/users", data);
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await axiosInstance.patch(`/users/${id}`, data);
  return res.data;
};

export const updateUserRole = async (id, roleData) => {
  const res = await axiosInstance.patch(`/users/${id}/role`, roleData);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axiosInstance.delete(`/users/${id}`);
  return res.data;
};
