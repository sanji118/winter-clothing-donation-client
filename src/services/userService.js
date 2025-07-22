import axiosInstance from "../hooks/axiosInstance"

export const getUsers = async () => {
    const res = await axiosInstance.get('/users');
    return res.data;
}

export const getAdminData = async () => {
    const res = await axiosInstance.get('/auth/admin/dashboard');
    return res.data;
}


export const getVolunteerData = async () => {
    const res = await axiosInstance.get('/auth/volunteer/dashboard');
    return res.data;
}

export const getPartnerData = async () => {
    const res = await axiosInstance.get('/auth/partner/dashboard');
    return res.data;
}

export const getUserDashboardData = async () => {
    const res = await axiosInstance.get('/auth/user/dashboard');
    return res.data;
}
