import axiosInstance from "../hooks/axiosInstance";

export const getAnnouncements = async () => {
  const res = await axiosInstance.get("/announcements");
  return res.data;
};

export const getAnnouncementById = async (id) => {
  const res = await axiosInstance.get(`/announcements/${id}`);
  return res.data;
};

export const createAnnouncement = async (announcementData) => {
  const res = await axiosInstance.post("/announcements", announcementData);
  return res.data;
};

export const updateAnnouncement = async (id, announcementData) => {
  const res = await axiosInstance.patch(`/announcements/${id}`, announcementData);
  return res.data;
};

export const deleteAnnouncement = async (id) => {
  const res = await axiosInstance.delete(`/announcements/${id}`);
  return res.data;
};


export const postCommentToannouncement = async ({id, newComment}) => {
    const res = await axiosInstance.post(`announcements/${id}/comments`, newComment);
    return res.data;
}