import React from "react";
import "react-circular-progressbar/dist/styles.css";
import StatusCard from "../../../Slots/StatusCard";

const Blocked = ({ status, openStatusUpdateModal, openStatusStageModal, openCardInTheModal }) => {
  return (
    <>
      <StatusCard
        status={status}
        openStatusUpdateModal={openStatusUpdateModal}
        openStatusStageModal={openStatusStageModal}
        openCardInTheModal={openCardInTheModal}
      />
    </>
  );
};

export default Blocked;
