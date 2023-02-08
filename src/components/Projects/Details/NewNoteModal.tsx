import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../../../components/FormElements/Button";
import { quillModules } from "../../../config/quill-editor";

const NewNoteModal = (props) => {
  const [value, setValue] = useState("");
  return (
    <div className="modal-content">
      <div className="form-control">
        <ReactQuill
          theme="snow"
          modules={quillModules}
          value={value}
          onChange={(e) => {
            setValue(e);
            props.setNoteContent(e);
          }}
        />
      </div>
    </div>
  );
};

export default NewNoteModal;
