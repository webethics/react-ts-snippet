import axiosInstance from ".";

const userService = {
    // updateProfile(payload) {
    //     payload.is_updated = true;
    //     payload.managed_by_org = true;
    //     return axiosInstance.put(`users/update/${payload.user_id}`, payload);
    // },
    async getAllUsers() {
        return await axiosInstance.get("users/all");
    },
    // getUser(id) {
    //     return axiosInstance.get(`users/${id}`);
    // },
};

export default userService;
