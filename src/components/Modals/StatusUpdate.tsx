import React, { useState, useEffect } from "react";
import Tooltip from "../Tooltip";
import CustomSelect from "../FormElements/CustomSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../FormElements/Button";
import { TSHIRT_SIZES, STATUS_STAGES } from "../../utils/constants";
import statusStagesData from "../../local-json/status-stages.json";
import { quarters, telQuarters } from "../../utils/quarters";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import statusService from "../../services/statusService";
import omit from "lodash/omit";
import pick from "lodash/pick";
import moment from "moment/moment";
import "react-range-slider-input/dist/style.css";
import RangeSlider from "react-range-slider-input";
import InputField from "../FormElements/InputField";
import CheckboxField from "../FormElements/CheckboxField";
import RadioField from "../FormElements/RadioField";
import TextAreaField from "../FormElements/TextAreaField";

const StatusUpdate = ({
  projectStatus,
  currentProject,
  closeModal,
  editMode,
  updateStatusData,
}) => {
  const [showLoader, setShowLoader] = useState(false);
  const [activitesOptions, setActivitesOptions] = useState([]);
  const [collaborationsOptions, setCollaborationsOptions] = useState([]);
  const [progressComplete, setProgressComplete] = useState(null);

  const statusUpdateSchema = Yup.object().shape({
    blocked: Yup.string().required("Required"),
    on_track: Yup.string().required("Required"),
    status_notes: Yup.string().required("Required"),
    review_with_dlt: Yup.string().required("Required"),
    stage: Yup.string().required("Required"),
    blocked_notes: Yup.string().when("blocked", {
      is: (blocked) => {
        return blocked === "true";
      },
      then: Yup.string().required(),
    }),
    on_track_notes: Yup.string().when("on_track", {
      is: (on_track) => {
        return on_track === "false";
      },
      then: Yup.string().required(),
    }),
    dlt_review_notes: Yup.string().when("review_with_dlt", {
      is: (review_with_dlt) => {
        return review_with_dlt === "true";
      },
      then: Yup.string().required(),
    }),
    eng_launch_quarter: Yup.string().required("Required"),
    design_delivery_date: Yup.string().required("Required"),
  });

  let initialValues = {
    stage: projectStatus?.stage || null,
    outstanding_activities: projectStatus?.outstanding_activities || [],
    outstanding_collaborations: projectStatus?.outstanding_collaborations || [],
    status_notes: projectStatus?.status_notes || "",
    blocked: "",
    blocked_notes: "",
    design_delivery_date: "",
    eng_launch_quarter: projectStatus?.eng_launch_quarter || "",
    design_delivery_date_method:
      projectStatus?.design_delivery_date_method || "quarter",
    on_track: "",
    on_track_notes: "",
    quarter: projectStatus?.quarter || "",
    review_with_dlt: "",
    dlt_review_notes: "",
    teams: projectStatus?.teams || null,
    impacted_teams: currentProject?.impacted_teams || null,
    figma_link: currentProject?.figma_link || null,
    prd_link: currentProject?.prd_link || null,
    chat_url: currentProject?.chat_url || null,
    design_poc: currentProject?.design_poc || null,
    product_poc: currentProject?.product_poc || null,
    eng_lead: currentProject?.eng_lead || null,
    content_poc: currentProject?.content_poc || null,
    tpm_poc: currentProject?.tpm_poc || null,
    development_team: currentProject?.development_team || null,
    project_description: currentProject?.project_description || null,
    designer_capacity: currentProject?.designer_capacity || 0,
  };

  let selectedRequestedByOptions = [];
  let selectedTpmPocOptions = [];
  let selectedDesignPOCOptions = [];
  let selectedProductPOCOptions = [];
  let selectedEngLeadOptions = [];
  let selectedContentPOCOptions = [];
  let selectedDevelopmentTeamoptions = [];
  let selectedTshirtSizeOptions = [];
  let selectedTeamOptions = [];
  let selectedImpactedTeamOptions = [];
  let selectedDesignDelivaryDate = [];
  let selectedTargetEnginerrigQuarter = [];
  let selectedTargetDate = null;

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: statusUpdateSchema,
    onSubmit: (values) => {
      submitHandler(values);
    },
    validateOnMount: editMode ? true : false,
  });

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
    handleBlur,
  } = formik;

  const statusFieldsArray = [
    "stage",
    "outstanding_activities",
    "outstanding_collaborations",
    "status_notes",
    "blocked",
    "blocked_notes",
    "on_track",
    "on_track_notes",
    "design_delivery_date",
    "eng_launch_quarter",
    "design_delivery_date_method",
    "quarter",
    "review_with_dlt",
    "dlt_review_notes",
  ];

  if (currentProject) {
    if (currentProject.tpm_poc && currentProject.tpm_poc.length) {
      currentProject.tpm_poc.forEach((r) => {
        selectedTpmPocOptions.push({
          value: r,
          label: r,
        });
      });
    }
    if (currentProject.design_poc && currentProject.design_poc.length) {
      currentProject.design_poc.forEach((r) => {
        selectedDesignPOCOptions.push({
          value: r,
          label: r,
        });
      });
    }
    if (currentProject.product_poc && currentProject.product_poc.length) {
      currentProject.product_poc.forEach((r) => {
        selectedProductPOCOptions.push({
          value: r,
          label: r,
        });
      });
    }
    if (currentProject.eng_lead && currentProject.eng_lead.length) {
      currentProject.eng_lead.forEach((r) => {
        selectedEngLeadOptions.push({
          value: r,
          label: r,
        });
      });
    }
    if (currentProject.content_poc && currentProject.content_poc.length) {
      currentProject.content_poc.forEach((r) => {
        selectedContentPOCOptions.push({
          value: r,
          label: r,
        });
      });
    }
    if (
      currentProject.development_team &&
      currentProject.development_team.length
    ) {
      currentProject.development_team.forEach((r) => {
        selectedDevelopmentTeamoptions.push({
          value: r,
          label: r,
        });
      });
    }

    if (currentProject.impacted_teams && currentProject.impacted_teams.length) {
      currentProject.impacted_teams.forEach((r) => {
        selectedImpactedTeamOptions.push({
          value: r,
          label: r,
        });
      });
    }

    if (currentProject.teams && currentProject.teams.length) {
      currentProject.teams.forEach((r) => {
        selectedTeamOptions.push({
          value: r,
          label: r,
        });
      });
    }

    if (currentProject.t_shirt_size) {
      selectedTshirtSizeOptions.push({
        value: currentProject.t_shirt_size,
        label: currentProject.t_shirt_size,
      });
    }
  }
  if (projectStatus.stage) {
    selectedRequestedByOptions.push({
      value: projectStatus.stage,
      label: `${projectStatus.stage} ${projectStatus.progress_complete} %`,
    });
  }

  if (projectStatus.design_delivery_date) {
    if (projectStatus.design_delivery_date_method === "quarter") {
      initialValues.design_delivery_date = projectStatus.design_delivery_date;
      selectedDesignDelivaryDate.push({
        value: projectStatus.design_delivery_date,
        label: projectStatus.design_delivery_date,
      });
    } else {
      selectedTargetDate = moment(projectStatus.design_delivery_date).toDate();
      initialValues.design_delivery_date = selectedTargetDate;
    }
  }

  if (projectStatus.eng_launch_quarter) {
    selectedTargetEnginerrigQuarter.push({
      value: projectStatus.eng_launch_quarter,
      label: projectStatus.eng_launch_quarter,
    });
  }

  const handleStageChange = (stage = null) => {
    if (stage) {
      const currentStage = statusStagesData.stages[stage];
      if (projectStatus?.stage !== stage) {
        formik.setFieldValue("outstanding_activities", []);
      } else {
        formik.setFieldValue(
          "outstanding_activities",
          projectStatus.outstanding_activities
        );
      }
      if (projectStatus?.stage !== stage) {
        formik.setFieldValue("outstanding_collaborations", []);
      } else {
        formik.setFieldValue(
          "outstanding_collaborations",
          projectStatus.outstanding_collaborations
        );
      }
      setActivitesOptions(currentStage.activities);
      setCollaborationsOptions(currentStage.collaborations);
      setProgressComplete(currentStage.percentage_complete);
    }
  };

  const str2bool = (value) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  };

  const removeFieldFromErrors = (field) => {
    delete errors[field];
    delete touched[field];
  };

  const submitHandler = async (values) => {
    const originalValues = {
      ...values,
    };

    const projectFields = omit(originalValues, statusFieldsArray);
    const statusFields = pick(originalValues, statusFieldsArray);
    statusFields.progress_complete = progressComplete;

    statusFields.on_track = str2bool(statusFields.on_track);
    statusFields.blocked = str2bool(statusFields.blocked);
    statusFields.review_with_dlt = str2bool(statusFields.review_with_dlt);

    const payload = {
      project_id: currentProject._id,
      project_template_id: "string",
      status: statusFields,
      ...projectFields,
    };
    let updateStatus = false;
    if (projectStatus._id) {
      updateStatus = true;
    }
    setShowLoader(true);
    try {
      const res = await statusService.save(payload, updateStatus);
      if (res.data) {
        updateStatusData(res.data);
        closeModal();
      }
      setShowLoader(false);
    } catch (err) {
      setShowLoader(false);
      console.log(err);
    }
  };

  useEffect(() => {
    handleStageChange(values.stage);
  }, [values.stage]);
  return (
    <>
      <div className="px-6 lg:px-8 custom-modal">
        <h3 className="text-16 text-black font-inter-medium block mb-8">
          {currentProject?.project_name}
        </h3>
        <div className="form-control">
          <label className="field-label text-left" tabIndex="10">
            What stage is the project in?
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </label>
          <div className="select-wrapper" tabIndex="12">
            <CustomSelect
              placeholder="Select a stage"
              options={STATUS_STAGES}
              handleChange={handleChange}
              value={selectedRequestedByOptions}
              setFieldValue={formik.setFieldValue}
              name="stage"
              handleBlur={() => formik.setFieldTouched("stage")}
              error={errors?.stage && touched?.stage}
              isNotCreateable={true}
            />
          </div>
        </div>

        {activitesOptions?.length > 0 && (
          <div className="form-control">
            <label className="field-label text-left mb-4" tabIndex="10">
              What activities are still outstanding?
              <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            </label>
            <ul>
              {activitesOptions.map((activity, index) => {
                return (
                  <li className="flex justify-between mb-4" key={index}>
                    <div className="flex mr-4 mb-2 relative">
                      <CheckboxField
                        id={`outstanding_activities_${index}`}
                        name="outstanding_activities"
                        value={activity}
                        onChange={handleChange}
                        checked={values.outstanding_activities.includes(
                          activity
                        )}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {collaborationsOptions?.length > 0 && (
          <div className="form-control">
            <label className="field-label text-left mb-4" tabIndex="10">
              What collaborations are still outstanding?
              <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            </label>
            <ul>
              {collaborationsOptions.map((collaboration, index) => {
                return (
                  <li className="flex justify-between mb-4" key={index}>
                    <div className="flex mr-4 mb-2 relative">
                      <CheckboxField
                        id={`outstanding_collaborations_${index}`}
                        name="outstanding_collaborations"
                        value={collaboration}
                        onChange={handleChange}
                        checked={values.outstanding_collaborations.includes(
                          collaboration
                        )}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="form-control">
          <TextAreaField
            label="Status notes"
            labelTabIndex="2"
            placeholder="What’s going on with the project?"
            value={values.status_notes}
            name="status_notes"
            error={errors?.status_notes && touched?.status_notes}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className="form-control">
          <label className="field-label text-left" tabIndex="13">
            Are you being blocked in any way?
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </label>
          <ul className="grid gap-3 grid-cols-2 mb-2.5">
            <li>
              <RadioField
                id="yes"
                name="blocked"
                value="true"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.blocked === "true"}
                label="Yes"
                labelTabIndex="15"
              />
            </li>
            <li>
              <RadioField
                id="no"
                name="blocked"
                value="false"
                onChange={(e) => {
                  handleChange(e);
                  removeFieldFromErrors("blocked_notes");
                }}
                onBlur={handleBlur}
                checked={values.blocked === "false"}
                label="No"
                labelTabIndex="16"
              />
            </li>
          </ul>
          {values.blocked === "true" && (
            <TextAreaField
              placeholder="Please explain how you are blocked"
              value={values.blocked_notes}
              name="blocked_notes"
              error={errors?.blocked_notes && touched?.blocked_notes}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </div>

        <div className="form-control">
          <label className="field-label text-left" tabIndex="13">
            Target design delivery date
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </label>
          <ul className="grid gap-3 grid-cols-2 mb-2.5">
            <li>
              <RadioField
                id="quarter"
                name="design_delivery_date_method"
                value="quarter"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "design_delivery_date",
                    editMode && selectedDesignDelivaryDate
                      ? selectedDesignDelivaryDate
                      : ""
                  );
                  removeFieldFromErrors("design_delivery_date");
                }}
                onBlur={handleBlur}
                checked={values.design_delivery_date_method === "quarter"}
                label="Quarter"
                labelTabIndex="15"
              />
            </li>
            <li>
              <RadioField
                id="date"
                name="design_delivery_date_method"
                value="date"
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue(
                    "design_delivery_date",
                    editMode && selectedTargetDate ? selectedTargetDate : ""
                  );
                  removeFieldFromErrors("design_delivery_date");
                }}
                onBlur={handleBlur}
                checked={values.design_delivery_date_method === "date"}
                label="Date"
                labelTabIndex="16"
              />
            </li>
          </ul>
          {values.design_delivery_date_method === "quarter" ? (
            <div className="form-control">
              <div className="select-wrapper" tabIndex="12">
                <CustomSelect
                  placeholder="Select quarter"
                  options={quarters}
                  handleChange={handleChange}
                  value={selectedDesignDelivaryDate}
                  setFieldValue={formik.setFieldValue}
                  name="design_delivery_date"
                  handleBlur={() =>
                    formik.setFieldTouched("design_delivery_date")
                  }
                  error={
                    errors?.design_delivery_date &&
                    touched?.design_delivery_date
                  }
                  isNotCreateable={true}
                />
              </div>
            </div>
          ) : (
            <DatePicker
              className={`!text-16
              !leading-20
              font-normal
              font-inter-regular
              text-black !w-full
              !h-auto
              !bg-fieldBg focus:!bg-fieldBg
              border border-fieldOutline focus:!border-primary focus:outline-none focus-visible:outline-none
              invalid:border-error 
              !rounded-3 !p-4 !py-3.5
              placeholder:text-fieldNoFocus focus:placeholder:text-placeholder focus-visible:outline-none;${
                errors?.design_delivery_date && touched?.design_delivery_date
                  ? "!border !border-error  !bg-white"
                  : "!bg-white"
              }`}
              selected={values.design_delivery_date}
              onChange={(date) => setFieldValue("design_delivery_date", date)}
              onBlur={(e) => {
                formik.setFieldTouched("design_delivery_date");
              }}
            />
          )}
        </div>

        <div className="form-control">
          <label className="field-label text-left" tabIndex="13">
            Are you on track to deliver the designs by this time?
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </label>
          <ul className="grid gap-3 grid-cols-2 mb-2.5">
            <li>
              <RadioField
                id="track_yes"
                name="on_track"
                value="true"
                onChange={(e) => {
                  handleChange(e);
                  removeFieldFromErrors("on_track_notes");
                }}
                onBlur={handleBlur}
                checked={values.on_track === "true"}
                label="Yes"
                labelTabIndex="15"
              />
            </li>
            <li>
              <RadioField
                id="track_no"
                name="on_track"
                value="false"
                onChange={(e) => {
                  handleChange(e);
                  removeFieldFromErrors("on_track_notes");
                }}
                onBlur={handleBlur}
                checked={values.on_track === "false"}
                label="No"
                labelTabIndex="16"
              />
            </li>
          </ul>
          {values.on_track === "false" && (
            <TextAreaField
              placeholder="Please explain how you are blocked"
              value={values.on_track_notes}
              name="on_track_notes"
              error={errors?.on_track_notes && touched?.on_track_notes}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </div>

        <div className="form-control">
          <label className="field-label text-left" tabIndex="10">
            Target engineering launch quarter
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </label>
          <div className="select-wrapper" tabIndex="12">
            <CustomSelect
              placeholder="Select a quarter"
              options={telQuarters}
              handleChange={handleChange}
              value={selectedTargetEnginerrigQuarter}
              setFieldValue={formik.setFieldValue}
              name="eng_launch_quarter"
              handleBlur={() => formik.setFieldTouched("eng_launch_quarter")}
              error={errors?.eng_launch_quarter && touched?.eng_launch_quarter}
            />
          </div>
        </div>

        <div className="form-control">
          <label className="field-label text-left" tabIndex="13">
            Would you like to review with DLT?
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </label>
          <ul className="grid gap-3 grid-cols-2 mb-2.5">
            <li>
              <RadioField
                id="dlt_yes"
                name="review_with_dlt"
                value="true"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.review_with_dlt === "true"}
                label="Yes"
                labelTabIndex="15"
              />
            </li>
            <li>
              <RadioField
                id="dlt_no"
                name="review_with_dlt"
                value="false"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={values.review_with_dlt === "false"}
                label="Not right now"
                labelTabIndex="16"
              />
            </li>
          </ul>
          {values.review_with_dlt === "true" && (
            <TextAreaField
              placeholder="What would you like to review?"
              value={values.dlt_review_notes}
              name="dlt_review_notes"
              error={errors?.dlt_review_notes && touched?.dlt_review_notes}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </div>

        <div className="border-b border-[#E8EDF4]  mb-7"></div>
        <h3 className="text-16 text-black font-inter-medium block mb-6">
          Project details (Optional)
        </h3>
        <div className="form-control">
          <label className="field-label text-left" tabIndex="10">
            T-shirt size
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </label>
          <div className="select-wrapper" tabIndex="12">
            <CustomSelect
              placeholder="Select size"
              options={TSHIRT_SIZES}
              value={selectedTshirtSizeOptions}
              handleChange={handleChange}
              setFieldValue={formik.setFieldValue}
              name="t_shirt_size"
              handleBlur={() => formik.setFieldTouched("t_shirt_size")}
              error={errors?.t_shirt_size && touched?.t_shirt_size}
            />
          </div>
        </div>
        <div className="form-control">
          <label className="field-label text-left" tabIndex="10">
            What % of your time will you spend on this project?
            <Tooltip
              tabIndex="11"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
          </label>
          <div className="flex flex-wrap items-center justify-between">
            <RangeSlider
              className="single-thumb"
              defaultValue={[0, 0]}
              step={10}
              thumbsDisabled={[true, false]}
              rangeSlideDisabled={false}
              onInput={(e) => {
                setFieldValue("designer_capacity", e[1]);
              }}
              value={[0, values.designer_capacity]}
            />
            <div className="field-wrap relative">
              <InputField
                label="%"
                labelTabIndex="2"
                tabIndex="3"
                labelClass="absolute top-0 right-0 flex flex-wrap items-center justify-center h-full w-8"
                inputClass="custom-input-field mb-0 text-center !pr-7"
                error={errors?.designer_capacity && touched?.designer_capacity}
                value={values.designer_capacity}
                onChange={(e) => {
                  if (e.target.value <= 100) {
                    handleChange(e);
                  }
                }}
                onBlur={handleBlur}
                name="designer_capacity"
              />
            </div>
          </div>
        </div>
        <div className="form-control">
          <TextAreaField
            label="Project summary"
            labelTabIndex="10"
            placeholder="What is this project about?"
            value={values.project_description}
            name="project_description"
            error={errors?.project_description && touched?.status_notes}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="form-control">
          <label className="field-label text-left" tabIndex="10">
            Team
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </label>
          <div className="select-wrapper" tabIndex="12">
            <CustomSelect
              placeholder="Select a team"
              options={[]}
              value={selectedTeamOptions}
              handleChange={handleChange}
              setFieldValue={formik.setFieldValue}
              name="teams"
              handleBlur={() => formik.setFieldTouched("teams")}
              error={errors?.teams && touched?.team}
              isMulti
            />
          </div>
        </div>
        <div className="form-control">
          <label className="field-label text-left" tabIndex="10">
            Impacted team(s)
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </label>
          <div className="select-wrapper" tabIndex="12">
            <CustomSelect
              placeholder="Select a team"
              options={[]}
              value={selectedImpactedTeamOptions}
              handleChange={handleChange}
              setFieldValue={formik.setFieldValue}
              name="impacted_teams"
              handleBlur={() => formik.setFieldTouched("impacted_teams")}
              error={errors?.impacted_teams && touched?.impacted_teams}
              isMulti
            />
          </div>
        </div>

        <div className="form-control">
          <InputField
            label="PRD link"
            labelTabIndex="2"
            tabIndex="3"
            placeholder="https://"
            name="prd_link"
            error={errors?.prd_link && touched?.prd_link}
            value={values.prd_link}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="form-control">
          <InputField
            label="Figma link"
            labelTabIndex="2"
            tabIndex="3"
            placeholder="https://"
            name="figma_link"
            error={errors?.figma_link && touched?.figma_link}
            value={values.figma_link}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="form-control">
          <InputField
            label="Project Chat URL"
            labelTabIndex="2"
            tabIndex="3"
            placeholder="Project Chat URL"
            name="chat_url"
            error={errors?.chat_url && touched?.chat_url}
            value={values.chat_url}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="form-control">
          <label className="field-label text-left" tabIndex="2">
            Design POC
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </label>
          <div className="select-wrapper" tabIndex="12">
            <CustomSelect
              placeholder="Design Poc"
              options={[]}
              handleChange={handleChange}
              value={selectedDesignPOCOptions}
              setFieldValue={formik.setFieldValue}
              name="design_poc"
              handleBlur={() => formik.setFieldTouched("design_poc")}
              error={errors?.design_poc && touched?.design_poc}
              isMulti
            />
          </div>
        </div>
        <div className="form-control">
          <label className="field-label text-left" tabIndex="2">
            Product POC
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </label>
          <div className="select-wrapper" tabIndex="12">
            <CustomSelect
              placeholder="Product Poc"
              options={[]}
              value={selectedProductPOCOptions}
              handleChange={handleChange}
              setFieldValue={formik.setFieldValue}
              name="product_poc"
              handleBlur={() => formik.setFieldTouched("product_poc")}
              error={errors?.product_poc && touched?.product_poc}
              isMulti
            />
          </div>
        </div>
        <div className="form-control">
          <label className="field-label text-left" tabIndex="2">
            Eng Lead
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </label>
          <div className="select-wrapper" tabIndex="12">
            <CustomSelect
              placeholder="Eng Lead"
              options={[]}
              value={selectedEngLeadOptions}
              handleChange={handleChange}
              setFieldValue={formik.setFieldValue}
              name="eng_lead"
              handleBlur={() => formik.setFieldTouched("eng_lead")}
              error={errors?.eng_lead && touched?.eng_lead}
              isMulti
            />
          </div>
        </div>
        <div className="form-control">
          <label className="field-label text-left" tabIndex="2">
            Content POC
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </label>
          <div className="select-wrapper" tabIndex="12">
            <CustomSelect
              placeholder=" Content POC"
              options={[]}
              value={selectedContentPOCOptions}
              handleChange={handleChange}
              setFieldValue={formik.setFieldValue}
              name="content_poc"
              handleBlur={() => formik.setFieldTouched("content_poc")}
              error={errors?.content_poc && touched?.content_poc}
              isMulti
            />
          </div>
        </div>
        <div className="form-control">
          <label className="field-label text-left" tabIndex="2">
            TPM POC
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </label>
          <div className="select-wrapper" tabIndex="12">
            <CustomSelect
              placeholder="TPM POC"
              options={[]}
              value={selectedTpmPocOptions}
              handleChange={handleChange}
              setFieldValue={formik.setFieldValue}
              name="tpm_poc"
              handleBlur={() => formik.setFieldTouched("tpm_poc")}
              error={errors?.tpm_poc && touched?.tpm_poc}
              isMulti
            />
          </div>
        </div>
        <div className="form-control">
          <label className="field-label text-left" tabIndex="2">
            Development team
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          </label>
          <div className="select-wrapper" tabIndex="12">
            <CustomSelect
              placeholder="Development team"
              options={[]}
              value={selectedDevelopmentTeamoptions}
              handleChange={handleChange}
              setFieldValue={formik.setFieldValue}
              name="development_team"
              handleBlur={() => formik.setFieldTouched("development_team")}
              error={errors?.development_team && touched?.development_team}
              isMulti
            />
          </div>
        </div>
      </div>
      <div className="modal-footer border-t border-t-fieldOutline p-6 flex flex-wrap items-center justify-end fixed left-0 right-0 bottom-0 bg-white z-50">
        <Button
          classes="custom-button custom-button-large custom-button-fill-primary w-auto"
          attributes={{
            type: "button",
            disabled:
              Object.keys(errors).length > 0 ||
              (!editMode && Object.keys(touched).length < 1)
                ? true
                : false,
            value: "Save status",
            clickEvent: () => handleSubmit(),
            loader: showLoader,
          }}
        />
      </div>
    </>
  );
};

export default StatusUpdate;
