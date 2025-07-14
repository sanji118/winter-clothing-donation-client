import axiosInstance from "../hooks/axiosInstance"

export const initiateSSLPayment = async (paymentData) => {
    const res = await axiosInstance.post('/payment/initiate-ssl-payment', paymentData);
    return res.data;
}

export const submitBankDonation = async (donationData) => {
    const res = await axiosInstance.post('/donations', donationData);
    return res.data;
}

export const verifyPaymentStatus = async (transactionId) => {
    const res = await axiosInstance.get(`/payment/payment-status/${transactionId}`);
    return res.data;
}
