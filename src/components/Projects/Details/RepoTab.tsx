import React, { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import UserImage from "../../../assets/images/user-pf-image.png";
import CustomChip from "../../../includes/CustomChip";
import Button from "../../FormElements/Button";

const RepoTab = (props) => {
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
