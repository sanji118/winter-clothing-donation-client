import axiosInstance from "../hooks/axiosInstance";

export const getDonations = async () => {
  const res = await axiosInstance.get("/donations");
  return res.data;
};

export const getDonationById = async (id) => {
  const res = await axiosInstance.get(`/donations/${id}`);
  return res.data;
};

export const getDonationBySlug = async (slug) => {
  const res = await axiosInstance.get(`/donations/slug/${slug}`);
  return res.data;
};

export const createDonation = async (data) => {
  const res = await axiosInstance.post("/donations", data);
  return res.data;
};

export const updateDonation = async (id, data) => {
  const res = await axiosInstance.patch(`/donations/${id}`, data);
  return res.data;
};

export const deleteDonation = async (id) => {
  const res = await axiosInstance.delete(`/donations/${id}`);
  return res.data;
};
