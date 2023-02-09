export interface projectListingConfig {
    projectsHasLoaded: boolean;
    projects: Array<{
        is_waiting: any;
        slug: string;
        project_name: string;
        status: any;
        project_type: string;
    }>;
}
