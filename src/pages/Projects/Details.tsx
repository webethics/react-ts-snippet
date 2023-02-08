import React, { useEffect, useState } from "react";
import Footer from "../../components/includes/Footer";
import Button from "../../components/formElements/Button";
import HomeTab from "../../components/Projects/Details/HomeTab";
import RepoTab from "../../components/Projects/Details/RepoTab";
import SupportTab from "../../components/Projects/Details/SupportTab";
import MediaQuery from "react-responsive";
import { Link, useParams, useNavigate } from "react-router-dom";
import BackBtn from "../../assets/images/back-arrow.svg";
import "react-loading-skeleton/dist/skeleton.css";
import Dropdown from "../../components/includes/Dropdown";
import CustomModal from "../../components/includes/Modal";
import AddProject from "../../components/Projects/AddProject";
import ConfirmModal from "../../components/Modals/Confirm";
import notesService from "../../services/notesService";
import statusService from "../../services/statusService";
import ProjectStatusHomeSkeleton from "../../components/Skeleton/ProjectStatusHomeSkeleton";
import userService from "../../services/userService";
import projectService from "../../services/projectService";
const ProjectDetails = (props) => {
    const [showLoader, setShowLoader] = useState(false);
    const [project, setProject] = useState(null);
    const params = useParams();
    const navigate = useNavigate();
    const [showSkelton, setShowSkelton] = useState(true);
    const [showProjectEditModal, setShowProjectEditModal] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [showProjectDeleteModal, setShowProjectDeleteModal] = useState(false);
    const [projectStatus, setProjectStatus] = useState([]);
    const [unResolvedNotes, setUnResolvedNotes] = useState([]);
    const [resolvedNotes, setResolvedNotes] = useState([]);
    const [showProjectArchiveModal, setShowProjectArchiveModal] =
        useState(false);

    const [activeTab, setActiveTab] = useState({
        active: true,
        support: false,
        repo: false,
    });

    const getProjectBySlug = async () => {
        try {
            const res = await projectService.getProjectBySlug(params.slug);
            const { data } = res;
            if (!params.name) {
                navigate(
                    `/project/${data.slug}/${data.project_name
                        .toLowerCase()
                        .replace(/[^a-zA-Z0-9 ]/g, "")
                        .replace(/\s/g, "-")}`
                );
            }
            document.title = `${data.project_name} – HMW`;
            setProject(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProject = async () => {
        setShowLoader(true);
        try {
            const res = await projectService.deleteProject(project.slug);
            if (res.data) {
                navigate("/projects");
            }
            setShowLoader(false);
        } catch (error) {
            setShowLoader(false);
            console.log(error);
        }
    };

    const handleDropdownEvent = (action, project) => {
        if (action === "Delete") {
            setShowProjectDeleteModal(true);
        }
        if (action === "Edit") {
            setShowProjectEditModal(true);
        }
        if (action === "Archive" || action === "Unarchive") {
            setShowProjectArchiveModal(true);
        }
    };

    const getAllUsers = async () => {
        try {
            const res = await userService.getAllUsers();
            const { user } = res.data;
            let options = [];
            user.forEach((u) => {
                if (u.full_name) {
                    options.push({ value: u.full_name, label: u.full_name });
                }
            });
            setAllUsers(options);
        } catch (err) {
            console.log(err);
        }
    };

    const getStatusByProjectId = async (projectId) => {
        try {
            const res = await statusService.getByProjectId(projectId);
            setProjectStatus(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getNotes = async (projectId) => {
        try {
            const res = await notesService.get(projectId);
            setUnResolvedNotes(res.data.filter((d) => !d.resolved));
            setResolvedNotes(res.data.filter((d) => d.resolved));
        } catch (err) {
            console.log(err);
        }
    };

    const archiveProject = async () => {
        setShowLoader(true);
        const project_status =
            project.project_status === "archive" ? "active" : "archive";
        try {
            await projectService.updateProjectStatus(project.slug, {
                project_status,
            });
            navigate("/projects");
        } catch (err) {
            setShowLoader(false);
            console.log(err);
        }
    };

    useEffect(() => {
        (async () => {
            const projectResponse = await getProjectBySlug();
            const { _id } = projectResponse;
            await getStatusByProjectId(_id);
            await getNotes(_id);
            setShowSkelton(false);
        })();
        getAllUsers();
    }, []);

    const closeProjectDeleteModal = () => {
        setShowProjectDeleteModal(false);
    };

    const closeProjectEditModal = () => {
        setShowProjectEditModal(false);
    };

    const changeTab = (tab) => {
        tab === "active"
            ? setActiveTab({ active: true, support: false, repo: false })
            : tab === "support"
            ? setActiveTab({ active: false, support: true, repo: false })
            : setActiveTab({ active: false, support: false, repo: true });
    };

    const updateProjectDataHandler = (data) => {
        setProject((prev) => {
            return { ...prev, ...data };
        });
    };

    const updateProjectStatusHandler = (data) => {
        setProjectStatus((prev) => {
            return {
                ...prev,
                ...{
                    _id: data._id,
                    updated_on: data.updated_on,
                    expire: data.expire,
                    ...data.status,
                },
            };
        });
    };

    const updateResolvedNotesHandler = (data) => {
        setResolvedNotes((prev) => [...prev, data]);
    };

    const closeProjectArchiveModal = () => {
        setShowProjectArchiveModal(false);
    };

    return (
        <div className="sm:ml-20 pt-7 sm:pb-7 pb-28  sm:py-18 ">
            <div className="custom-medium-container">
                <div className="relative px-4 sm:px-0">
                    <div className="header flex flex-wrap items-center justify-between mb-10">
                        <Link
                            to="/projects"
                            tabIndex="1"
                            className="block sm:hidden mr-auto"
                        >
                            <img
                                src={BackBtn}
                                alt="Back Btn"
                                className="mx-auto"
                            />
                        </Link>
                        <MediaQuery maxWidth={640}>
                            <Dropdown
                                className="block sm:hidden relative -top-3"
                                clickEvent={(action) => {
                                    handleDropdownEvent(action, project);
                                }}
                                addArchiveButton={true}
                                archiveButtonText={
                                    project?.project_status === "archive"
                                        ? "Unarchive"
                                        : "Archive"
                                }
                            />
                        </MediaQuery>
                    </div>

                    {showSkelton ? (
                        <ProjectStatusHomeSkeleton />
                    ) : (
                        <>
                            <div
                                className={`flex flex-wrap items-center mb-8 sm:mb-12`}
                            >
                                <h1
                                    className={`headingOne !text-left !mb-0 mr-3`}
                                >
                                    {project?.project_name}
                                </h1>
                                <MediaQuery minWidth={641}>
                                    <Dropdown
                                        clickEvent={(action) => {
                                            handleDropdownEvent(
                                                action,
                                                project
                                            );
                                        }}
                                        addArchiveButton={true}
                                        archiveButtonText={
                                            project?.project_status ===
                                            "archive"
                                                ? "Unarchive"
                                                : "Archive"
                                        }
                                    />
                                </MediaQuery>
                            </div>

                            <div className="flex flex-wrap items-center justify-between">
                                <div className="tabs">
                                    <Button
                                        attributes={{
                                            type: "button",
                                            disabled: false,
                                            value: "Home",
                                            clickEvent: () => {
                                                changeTab("active");
                                            },
                                        }}
                                        classes={`tab ${
                                            activeTab.active ? "active" : ""
                                        }`}
                                    />
                                    <Button
                                        attributes={{
                                            type: "button",
                                            disabled: false,
                                            value: "Support",
                                            clickEvent: () => {
                                                changeTab("support");
                                            },
                                        }}
                                        classes={`tab ${
                                            activeTab.support ? "active" : ""
                                        }`}
                                    />
                                    <Button
                                        attributes={{
                                            type: "button",
                                            disabled: false,
                                            value: "Repo",
                                            clickEvent: () => {
                                                changeTab("repo");
                                            },
                                        }}
                                        classes={`tab ${
                                            activeTab.repo ? "active" : ""
                                        }`}
                                    />
                                </div>

                                <div className="w-full mt-8">
                                    {activeTab.active ? (
                                        project && (
                                            <HomeTab
                                                project={project}
                                                projectStatus={projectStatus}
                                                unResolvedNotes={
                                                    unResolvedNotes
                                                }
                                                resolvedNotes={resolvedNotes}
                                                updateProjectStatus={(data) => {
                                                    updateProjectStatusHandler(
                                                        data
                                                    );
                                                }}
                                                updateProjectData={(data) => {
                                                    updateProjectDataHandler(
                                                        data
                                                    );
                                                }}
                                                updateUnResolvedNotes={(
                                                    data
                                                ) => {
                                                    setUnResolvedNotes(data);
                                                }}
                                                updateResolvedNotes={(data) => {
                                                    updateResolvedNotesHandler(
                                                        data
                                                    );
                                                }}
                                            />
                                        )
                                    ) : activeTab.support ? (
                                        <SupportTab
                                            project={project}
                                            updateCurrentProject={(
                                                projectData
                                            ) => {
                                                setProject(projectData);
                                            }}
                                            allUsers={allUsers}
                                            deleteAction={() => {
                                                deleteProject();
                                            }}
                                        />
                                    ) : (
                                        <RepoTab />
                                    )}
                                </div>
                                <CustomModal
                                    isOpen={showProjectEditModal}
                                    isClose={closeProjectEditModal}
                                    component={
                                        <AddProject
                                            closeModal={closeProjectEditModal}
                                            editMode={true}
                                            project={project}
                                            allUsers={allUsers}
                                            updateProjects={(projectData) => {
                                                document.title = `${projectData.project_name} – HMW`;
                                                setProject((prev) => {
                                                    updateProjectDataHandler(
                                                        projectData
                                                    );
                                                });
                                            }}
                                        />
                                    }
                                    closeModal={closeProjectEditModal}
                                    title="Edit a project"
                                    buttonContent="Save project"
                                />

                                <CustomModal
                                    isOpen={showProjectDeleteModal}
                                    isClose={closeProjectDeleteModal}
                                    component={
                                        <ConfirmModal
                                            heading="Are you sure you want to delete this project?"
                                            attributes={{
                                                clickEvent: () => {
                                                    deleteProject();
                                                },
                                                loader: showLoader,
                                            }}
                                            closeModal={closeProjectDeleteModal}
                                        />
                                    }
                                    closeModal={closeProjectDeleteModal}
                                />

                                <CustomModal
                                    isOpen={showProjectArchiveModal}
                                    isClose={closeProjectArchiveModal}
                                    component={
                                        <ConfirmModal
                                            heading={`Are you sure you want to ${
                                                project?.project_status ===
                                                "archive"
                                                    ? "Unarchive"
                                                    : "archive"
                                            } this project?`}
                                            attributes={{
                                                clickEvent: () => {
                                                    archiveProject();
                                                },
                                                loader: showLoader,
                                                buttonText: "Yes",
                                            }}
                                            closeModal={
                                                closeProjectArchiveModal
                                            }
                                        />
                                    }
                                    closeModal={closeProjectArchiveModal}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProjectDetails;
