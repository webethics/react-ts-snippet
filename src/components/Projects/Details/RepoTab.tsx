import React, { type ReactElement, useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";

const RepoTab = (): ReactElement => {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            if (percentage < 20) {
                setPercentage(percentage + 1);
            }
        }, 50);
    }, [percentage]);

    return <>RepoTab</>;
};

export default RepoTab;
