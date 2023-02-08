import React from "react";
import "react-circular-progressbar/dist/styles.css";
import StatusCard from "../../../Slots/StatusCard";
const Expire = ({ status, openStatusUpdateModal, openStatusStageModal }) => {
  return (
    <>
      <StatusCard
        status={status}
        openStatusUpdateModal={openStatusUpdateModal}
        openStatusStageModal={openStatusStageModal}
        displayLastUpdateTime={false}
        displayShareButton={false}
        applyOpacity={true}
        showLinkAtBottom={false}
      />
    </>
  );
};

export default Expire;
