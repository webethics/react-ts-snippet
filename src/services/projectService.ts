import axiosInstance from ".";

const projectService = {
    async saveProject(
        payload: {
            project_name: string | true;
            project_type: string | true;
            project_status: string | true;
            project_description: string | true;
            requested_by: true | null;
        },
        slug = ""
    ) {
        if (slug.length > 0) {
            return await axiosInstance.put(`projects/update/${slug}`, payload);
        }
        return await axiosInstance.post("projects/new", payload);
    },
    async getProjectsByUserId(userId: string, status: string) {
        if (status.length > 0) {
            return await axiosInstance.get(`projects/all/${status}/${userId}`);
        }
        return await axiosInstance.get(`projects/all/${userId}`);
    },
    // getProjectBySlug(slug) {
    //     return axiosInstance.get(`projects/${slug}`);
    // },
    // deleteProject(slug) {
    //     return axiosInstance.delete(`projects/${slug}`);
    // },
    // updateProjectStatus(slug, payload) {
    //     return axiosInstance.put(`projects/update/status/${slug}`, payload);
    // },
    // updateProjectWaitingStatus(slug, status) {
    //     return axiosInstance.put(`projects/update/waiting-status/${slug}`, {
    //         status,
    //     });
    // },
};

export default projectService;
