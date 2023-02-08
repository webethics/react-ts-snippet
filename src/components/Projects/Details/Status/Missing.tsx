import React from "react";
import Button from "../../../FormElements/Button";
import "react-circular-progressbar/dist/styles.css";

const Missing = (props) => {
  return (
    <>
      <div className="border border-fieldOutline rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div className="text-16 leading-20 font-semibold font-inter-regular text-black false">
            Status
          </div>
          <div className="leading-18 font-normal ml-2 inline-block text-13">
            <span className="w-2.5 h-2.5 bg-[#FECD48] rounded-full inline-block mr-2.5"></span>
            Missing
          </div>
        </div>
        <div>
          <span className="w-40 h-40 rounded-full bg-fieldBg block mx-auto my-8"></span>
        </div>
        <Button
          classes="custom-button custom-button-large custom-button-fill-primary"
          attributes={{
            type: "button",
            disabled: false,
            value: "Add a status",
            clickEvent: () => props.openStatusUpdateModal(),
          }}
        />
      </div>
    </>
  );
};

export default Missing;
