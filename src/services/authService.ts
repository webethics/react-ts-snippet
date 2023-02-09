import axiosInstance from ".";

const authServices = {
    async requestVerificationCodeByPhone(phoneNumber: string) {
        return await axiosInstance.post("auth/request", {
            phone_number: phoneNumber,
        });
    },
    async requestVerificationCodeByEmail(email: string) {
        return await axiosInstance.post("auth/request/email", { email });
    },
    async authVerify(payload: { phone_number: string; vcode: string }) {
        return await axiosInstance.post("auth/verify", {
            phone_number: payload.phone_number,
            vcode: +payload.vcode,
        });
    },
    async authVerifyEmail(payload: { email: string; otp: string }) {
        return await axiosInstance.post("auth/verify/email", payload);
    },
};

export default authServices;
