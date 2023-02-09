import React, { type ReactElement } from "react";
import Listing from "./Common/Listing";

const Archive = ({
    projects,
    projectsHasLoaded,
}: {
    projects: any;
    projectsHasLoaded: boolean;
}): ReactElement => {
    return (
        <Listing projectsHasLoaded={projectsHasLoaded} projects={projects} />
    );
};

export default Archive;
