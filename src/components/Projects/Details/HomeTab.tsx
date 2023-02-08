import React, { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import Button from "../../../components/FormElements/Button";
import MediaQuery from "react-responsive";
import ModalBottom from "../../../includes/ModalBottom";
import NewNoteModal from "./NewNoteModal";
import Dropdown from "../../../includes/Dropdown";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import notesService from "../../../services/notesService";
import Moment from "react-moment";
import CustomModal from "../../../includes/Modal";
import ConfirmModal from "../../Modals/Confirm";
import StatusUpdate from "../../Modals/StatusUpdate";
import Stage from "./Status/Stage";
import Expire from "./Status/Expire";
import Blocked from "./Status/Blocked";
import Missing from "./Status/Missing";
import { quillModules } from "../../../config/quill-editor";
import ToggleSwitch from "../../FormElements/ToggleSwitch";
import projectService from "../../../services/projectService";

const HomeTab = ({
  project,
  updateProjectData,
  updateUnResolvedNotes,
  unResolvedNotes,
  resolvedNotes,
  projectStatus,
  updateProjectStatus,
  updateResolvedNotes,
}) => {
  const [percentage, setPercentage] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [noteContent, setNoteContent] = useState(null);

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState([]);
  const [editNoteMode, setEditNoteMode] = useState(false);
  const [stageMobileModalOpen, setStageMobileModalOpen] = useState(false);
  const [noteIsDeleting, setNoteIsDeleting] = useState(false);
  const [showResolvedNotes, setShowResolvedNotes] = useState(false);
  const [toggle, setToggle] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function closeDeleteModal() {
    setDeleteModalIsOpen(false);
  }

  useEffect(() => {
    setTimeout(() => {
      if (percentage < 20) {
        setPercentage(percentage + 1);
      }
    }, 50);
  }, [percentage]);

  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const openStatusModal = () => {
    setStatusModalOpen(true);
  };
  const closeStatusModal = () => {
    setStatusModalOpen(false);
  };

  const [newNoteModalOpen, setNewNoteModalOpen] = useState(false);

  const openNewNoteModal = () => {
    setNewNoteModalOpen(true);
  };
  const closeNewNoteModal = () => {
    setNewNoteModalOpen(false);
  };

  const [statusUpdateOpen, setStatusUpdateOpen] = useState(false);

  const openStatusUpdate = () => {
    setStatusUpdateOpen(true);
  };
  const closeStatusUpdate = () => {
    setStatusUpdateOpen(false);
  };

  const cancelEdit = (note) => {
    setEditNoteMode(false);
    mapUnResolvedNotes(note, true);
    setNoteContent(null);
  };

  const isEditorNotEmpty = (value) => {
    if (value.replace(/<(.|\n)*?>/g, "").trim().length === 0 && !value.includes("<img")) {
      return true;
    }
    return false;
  };

  const handleDropdownEvent = (action, note) => {
    setSelectedNote(note);
    if (action === "Delete") {
      setDeleteModalIsOpen(true);
    }
    if (action === "Edit") {
      setEditNoteMode(true);
      mapUnResolvedNotes(note);
      setNoteContent(note.content);
    }
  };

  const filterUnResolvedNotes = (note) => {
    const cloneUnResolvedNotes = [...unResolvedNotes];
    const updatedUnsolvedNotes = cloneUnResolvedNotes.filter((obj) => {
      if (obj._id === note._id) {
        return false;
      }
      return true;
    });
    updateUnResolvedNotes(updatedUnsolvedNotes);
  };

  const mapUnResolvedNotes = (note = null, updateEntireNote = false) => {
    const cloneUnResolvedNotes = [...unResolvedNotes];
    const updatedUnsolvedNotes = cloneUnResolvedNotes.map((obj) => {
      if (obj.editable) {
        obj.editable = false;
      }
      if (obj._id === note?._id) {
        if (updateEntireNote) {
          obj = note;
        } else {
          note.editable = true;
        }
      }
      return obj;
    });
    updateUnResolvedNotes(updatedUnsolvedNotes);
  };

  const updateStatusDataHandler = (data) => {
    updateProjectStatus(data.status);
    updateProjectData(data.project);
  };

  const handleSubmit = async (note = null) => {
    if (!isEditorNotEmpty(noteContent)) {
      const payload = {
        project_id: project._id,
        content: noteContent,
        resolved: false,
        active: true,
        _id: note?._id,
      };
      try {
        setShowLoader(true);
        const res = await notesService.save(payload);
        if (res.data) {
          const unResolvedNotesClone = [...unResolvedNotes];
          unResolvedNotesClone.push(res.data);
          updateUnResolvedNotes(unResolvedNotesClone);
        }
        setShowLoader(false);
        setNoteContent(null);
        closeNewNoteModal(true);
        if (editNoteMode) {
          mapUnResolvedNotes(res.data, true);
        }
        setEditNoteMode(false);
      } catch (error) {
        setShowLoader(false);
        closeNewNoteModal(false);
        setEditNoteMode(false);
        console.log(error);
      }
    }
  };

  const reSolvedHanlder = async (e, note) => {
    e.preventDefault();
    try {
      const res = await notesService.resolved(note._id);
      if (res.data) {
        filterUnResolvedNotes(note);
        updateResolvedNotes(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async () => {
    setNoteIsDeleting(true);
    try {
      const res = await notesService.inActive(selectedNote._id);
      if (res.data) {
        filterUnResolvedNotes(selectedNote);
        setDeleteModalIsOpen(false);
      }
      setNoteIsDeleting(false);
    } catch (error) {
      setNoteIsDeleting(false);
      console.log(error);
    }
  };

  const updateWaitingStatus = async (status) => {
    try {
      const res = await projectService.updateProjectWaitingStatus(project.slug, status);
      const projectData = project;
      projectData.is_waiting = res.data.is_waiting;
      updateProjectData(projectData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap flex-col-reverse lg:flex-row">
        <div className="lg:w-7/12 w-full">
          <div className="border border-fieldOutline rounded-lg p-6">
            <h4 className="text-16 leading-20 font-inter-medium text-black false flex items-center">
              Notes
              {unResolvedNotes && unResolvedNotes.length > 0 && (
                <span className="w-5 h-5 bg-primary text-xs text-white font-mono-medium rounded-full flex items-center justify-center ml-3">
                  {unResolvedNotes.length}
                </span>
              )}
            </h4>
            {unResolvedNotes?.map((note, index) => {
              return (
                <>
                  <div
                    className={`flex py-6 flex-wrap ${
                      unResolvedNotes.length - 1 !== index
                        ? "border-b border-fieldOutline"
                        : ""
                    }`}
                    key={index}
                  >
                    <div className="c-userimg relative top-[-3px]">
                      <span className="w-8 h-8 rounded-full bg-[#FECD48] font-inter-medium uppercase text-black flex items-center justify-center">
                        {note.created_by.full_name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 pl-2.5 max-w-full">
                      <div className="flex justify-between items-center">
                        <h5 className="flex items-center break-words flex-1 text-16 font-inter-medium">
                          {note.created_by.full_name}
                          <span className="opacity-40 text-13 font-inter-regular ml-2">
                            <Moment fromNow>{note.created_on}</Moment>
                          </span>
                        </h5>
                        {!note.editable && (
                          <span className="ml-auto flex items-center">
                            <Dropdown
                              clickEvent={(action) => {
                                handleDropdownEvent(action, note);
                              }}
                            />
                          </span>
                        )}
                      </div>
                      {!note.editable && (
                        <>
                          <div
                            className="text-14 pb-2.5 qill-list break-words"
                            dangerouslySetInnerHTML={{ __html: note.content }}
                          />
                          <Link
                            onClick={(e) => reSolvedHanlder(e, note)}
                            className="text-13 text-primary font-mono-medium"
                          >
                            Resolved
                          </Link>
                        </>
                      )}

                      <MediaQuery minWidth={641}>
                        {note.editable && (
                          <div className="mt-4">
                            <div
                              className={`relative ${
                                editNoteMode ? "edit-mode" : ""
                              }`}
                            >
                              <ReactQuill
                                theme="snow"
                                modules={quillModules}
                                value={noteContent}
                                onChange={setNoteContent}
                              />
                              <Button
                                classes="custom-button custom-button-large px-4  custom-button-fill-primary absolute right-0 bottom-0 w-auto quill-button"
                                attributes={{
                                  type: "button",
                                  disabled:
                                    !noteContent ||
                                    isEditorNotEmpty(noteContent)
                                      ? true
                                      : false,
                                  value: "Save",
                                  loader: showLoader,
                                  clickEvent: () => handleSubmit(note),
                                }}
                              />
                              <Button
                                classes="custom-button custom-button-large px-4 custom-button-outline-primary absolute right-[75px] bottom-0 w-auto"
                                attributes={{
                                  type: "button",
                                  value: "Cancel",
                                  clickEvent: () => {
                                    cancelEdit(note);
                                  },
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </MediaQuery>
                    </div>
                  </div>
                  <MediaQuery maxWidth={640}>
                    {note.editable && (
                      <div className="mt-4">
                        <div className="relative ReactQuillMobile">
                          <ReactQuill
                            theme="snow"
                            modules={quillModules}
                            value={noteContent}
                            onChange={setNoteContent}
                          />
                          <Button
                            classes="custom-button custom-button-large custom-button-fill-primary mt-4 quill-button"
                            attributes={{
                              type: "button",
                              disabled:
                                !noteContent || isEditorNotEmpty(noteContent)
                                  ? true
                                  : false,
                              value: "Save",
                              loader: showLoader,
                              clickEvent: () => handleSubmit(note),
                            }}
                          />
                          <Button
                            classes="custom-button custom-button-large custom-button-outline-primary mt-3"
                            attributes={{
                              type: "button",
                              value: "Cancel",
                              clickEvent: () => {
                                cancelEdit(note);
                              },
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </MediaQuery>
                </>
              );
            })}

            {!editNoteMode && (
              <MediaQuery minWidth={641}>
                <div className="mt-4">
                  <div className="relative">
                    <ReactQuill
                      theme="snow"
                      modules={quillModules}
                      placeholder="Add a new note"
                      value={noteContent}
                      onChange={setNoteContent}
                    />
                    <Button
                      classes="custom-button custom-button-large custom-button-fill-primary absolute right-0 bottom-0 w-auto quill-button"
                      attributes={{
                        type: "button",
                        disabled:
                          !noteContent || isEditorNotEmpty(noteContent)
                            ? true
                            : false,
                        value: "Save",
                        loader: showLoader,
                        clickEvent: () => handleSubmit(),
                      }}
                    />
                  </div>
                </div>
              </MediaQuery>
            )}

            {!editNoteMode && (
              <MediaQuery maxWidth={640}>
                <button
                  className="custom-button custom-button-large custom-button-outline-primary flex items-center justify-center mt-5"
                  type="button"
                  onClick={openNewNoteModal}
                >
                  New note
                </button>
              </MediaQuery>
            )}

            {resolvedNotes?.length > 0 && (
              <div className="bg-[#F9F9FB] text-center p-3 rounded-md mt-5">
                <Link
                  className="text-13 text-primary font-mono-medium"
                  onClick={() => setShowResolvedNotes(!showResolvedNotes)}
                >
                  {!showResolvedNotes
                    ? `${resolvedNotes.length} resolved notes`
                    : "Hide resolved notes"}
                </Link>
              </div>
            )}

            {showResolvedNotes &&
              resolvedNotes?.map((note, index) => {
                return (
                  <>
                    <div
                      className={`flex py-6 flex-wrap ${
                        resolvedNotes.length - 1 !== index
                          ? "border-b border-fieldOutline"
                          : ""
                      }`}
                      key={index}
                    >
                      <div className="c-userimg relative top-1.5">
                        <span className="w-8 h-8 rounded-full bg-[#FECD48] font-inter-medium uppercase text-black flex items-center justify-center">
                          {note.created_by.full_name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 pl-2.5 max-w-full">
                        <div className="flex justify-between items-center">
                          <h5 className="flex items-center break-words flex-1 text-16 font-inter-medium">
                            {note.created_by.full_name}
                            <span className="opacity-40 text-13 font-inter-regular ml-2">
                              <Moment fromNow>{note.created_on}</Moment>
                            </span>
                          </h5>

                          {/* {!note.editable && (
                            <span className="ml-auto">
                              <Dropdown
                                clickEvent={(action) => {
                                  handleDropdownEvent(action, note);
                                }}
                              />
                            </span>
                          )} */}
                        </div>
                        {!note.editable && (
                          <>
                            <div
                              className="text-14 pb-2.5 qill-list break-words mt-3"
                              dangerouslySetInnerHTML={{
                                __html: note.content,
                              }}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>

        <div className="lg:w-5/12 lg:pl-6 mb-2.5">
          <div
            className={`border border-fieldOutline rounded-lg py-4 px-6 cursor-pointer mb-2.5 sm:mb-6 flex items-center transition-colors ease-in-out duration-300 ${
              project.is_waiting?.status && "bg-primary border-primary"
            }`}
          >
            <ToggleSwitch
              checked={project.is_waiting?.status}
              onColor="rgba(255,255,255,50%)"
              handleToggle={(e) => {
                updateWaitingStatus(e.target.checked);
                setToggle(!toggle);
              }}
            />
            <span
              className={`ml-3.5 text-14 ${
                project.is_waiting?.status && "text-white"
              }`}
            >
              {!project?.is_waiting?.status
                ? "Not waiting on me"
                : "Waiting on me"}
            </span>
            {project.is_waiting?.status && project.is_waiting?.enabled_on && (
              <span
                className={`ml-auto text-13 ${
                  project.is_waiting?.status && "text-white"
                }`}
              >
                <Moment fromNow>{project.is_waiting?.enabled_on}</Moment>
              </span>
            )}
          </div>
          {console.log(projectStatus, "Prdsfs")}
          {!Object.keys(projectStatus).length ? (
            <Missing
              openStatusUpdateModal={openStatusUpdate}
              status={projectStatus}
            />
          ) : !projectStatus.blocked && projectStatus.expire ? (
            <Expire
              status={projectStatus}
              openStatusUpdateModal={openStatusUpdate}
            />
          ) : projectStatus.blocked && !projectStatus.expired ? (
            <>
              <Blocked
                openStatusUpdateModal={openStatusUpdate}
                status={projectStatus}
                openStatusStageModal={() => setStageMobileModalOpen(true)}
              />
              <ModalBottom
                isOpen={stageMobileModalOpen}
                isClose={() => {
                  setStageMobileModalOpen(false);
                }}
                component={
                  <Blocked
                    status={projectStatus}
                    openStatusUpdateModal={() => {
                      setStageMobileModalOpen(false);
                      openStatusUpdate();
                    }}
                    openCardInTheModal={true}
                  />
                }
                title="Status"
              />
            </>
          ) : (
            <>
              <Stage
                openStatusUpdateModal={openStatusUpdate}
                status={projectStatus}
                openStatusStageModal={() => setStageMobileModalOpen(true)}
              />
              <ModalBottom
                isOpen={stageMobileModalOpen}
                isClose={() => {
                  setStageMobileModalOpen(false);
                }}
                component={
                  <Stage
                    status={projectStatus}
                    openStatusUpdateModal={() => {
                      setStageMobileModalOpen(false);
                      openStatusUpdate();
                    }}
                    openCardInTheModal={true}
                  />
                }
                title="Status"
              />
            </>
          )}
        </div>
      </div>
      <ModalBottom
        isOpen={newNoteModalOpen}
        isClose={closeNewNoteModal}
        component={
          <NewNoteModal setNoteContent={(value) => setNoteContent(value)} />
        }
        isQuillButton={true}
        title="New note"
        buttonContent="Save"
        attributes={{
          clickEvent: () => {
            handleSubmit();
          },
          loader: showLoader,
          disabled:
            !noteContent || isEditorNotEmpty(noteContent) ? true : false,
        }}
      />
      <CustomModal
        isOpen={deleteModalIsOpen}
        isClose={closeModal}
        component={
          <ConfirmModal
            heading="Are you sure you want to delete this note?"
            attributes={{
              clickEvent: () => {
                deleteNote();
              },
              loader: noteIsDeleting,
            }}
            closeModal={closeDeleteModal}
          />
        }
        closeModal={closeDeleteModal}
      />
      <CustomModal
        isOpen={statusUpdateOpen}
        isClose={closeModal}
        component={
          <StatusUpdate
            currentProject={project}
            closeModal={closeStatusUpdate}
            projectStatus={projectStatus}
            editMode={projectStatus._id || false}
            updateStatusData={(data) => updateStatusDataHandler(data)}
          />
        }
        title="Status update"
        closeModal={closeStatusUpdate}
      />
    </>
  );
};

export default HomeTab;
