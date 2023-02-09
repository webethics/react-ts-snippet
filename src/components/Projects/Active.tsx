import React, { type ReactElement } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Listing from "./Common/Listing";

const Active = ({
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

export default Active;
