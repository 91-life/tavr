import { useCallback, useEffect, useState } from "react";

import Table from "./Table";
import Button from "./Button";
import RegisterForm from "./RegisterForm";
import UpdateForm from "./UpdateForm";
import ScheduleForm from "./ScheduleForm";
import "../index.css";
import TAVRWorkflowForm from "./DataModal";
import { Modal } from 'antd';

import { patients as initialPatients } from "../data/patients";

export default function MainContent() {
  const [displayTable, setDisplayTable] = useState(true);
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
  const [displayUpdateForm, setDisplayUpdateForm] = useState(false);
  const [displayScheduleForm, setDisplayScheduleForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  function resetDisplay() {
    // setDisplayTable(false);
    setDisplayUpdateForm(false);
    setDisplayScheduleForm(false);
    setDisplayRegisterForm(false);
  }
  const modalStyle = {
    content: {
      width: "80vw",
      height: "80%",
      maxWidth: 1400,
    },
  }

  const [patients, setPatients] = useState(() => {
    const storedPatients = localStorage.getItem("patients");
    if (!storedPatients)
      localStorage.setItem("patients", JSON.stringify(initialPatients));

    return storedPatients ? JSON.parse(storedPatients) : initialPatients;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(patients.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPatients, setDisplayedPatients] = useState(
    patients.length <= itemsPerPage ? patients : patients.slice(0, itemsPerPage)
  );

  const handleAddPatientButtonClick = () => {
    setDisplayRegisterForm(true);
  };

  const handleCancelAddPatientButtonClick = () => {
    resetDisplay();
    // setDisplayTable(true);
  };

  const handleUpdateForm = (patient) => {
    setSelectedPatient(patient);
    resetDisplay();
    setDisplayUpdateForm(true);
  };

  const handleScheduleForm = (patient) => {
    setSelectedPatient(patient);
    resetDisplay();
    setDisplayScheduleForm(true);
  };
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    resetDisplay();
    // setDisplayTable(true);
  };

  const handleRegisterPatientButtonClick = useCallback((formData) => {
    const newPatient = {
      name: `${formData.firstName} ${formData.lastName}` || "",
      dateOfBirth: formData.dateOfBirth || "",
      MRI: formData.mrn || "",
      doctor: formData.physician || "",
      diagnosis: formData.diagnosis || "",
      latestEcho: {
        date: formData.echoDate || "",
        color: "#009758",
      },
      latestCTScan: {
        date: "",
      },
      labs: {
        date: "",
      },
      appointment: {
        date: formData.consultationAppointment || "",
      },
      dvcRepIntpr: "Device Rep Interpretation",
      status: "Update Patient",
      indexScores: {},
      timeline: {
        status: {
          text: "Awaiting Consultation",
          color: "#02844E",
          includeArrow: true,
        },
        progress: {
          first: "#d9d9d9",
          second: "#d9d9d9",
          third: "#d9d9d9",
          fourth: "#d9d9d9",
          fifth: "#d9d9d9",
          sixth: "#d9d9d9",
          seventh: "#d9d9d9",
        },
      },
    };
    const updatedPatients = [newPatient, ...patients];
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
    setDisplayRegisterForm(false);
    setDisplayTable(true);
  }, [patients, itemsPerPage, displayTable, displayRegisterForm]);

  const handleUpdatePatient = useCallback((updatedPatient) => {
    const updatedPatients = patients.map(patient =>
      patient.MRI === updatedPatient.MRI ? updatedPatient : patient
    );

    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
    setDisplayUpdateForm(false);
    setDisplayTable(true);
  }, [patients]);

  const updateProgress = (stageIndex, newStatus) => {
    const updatedPatients = patients.map(patient => {
      if (patient.MRI === selectedPatient.MRI) {
        const progressKeys = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh"];
        const progressKey = progressKeys[stageIndex];

        patient.timeline.progress[progressKey] = newStatus === "completed" ? "#009999" : "#d9d9d9";
      }
      return patient;
    });

    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
  };

  const updatePatientCheckboxes = (field, value) => {
    const updatedPatients = patients.map(patient => {
      if (patient.MRI === selectedPatient.MRI) {
        patient[field] = value;
      }
      return patient;
    });

    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
  }


  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedPatients(patients.slice(startIndex, endIndex));
  }, [currentPage, patients, itemsPerPage]);

  return (
    <div
      className={
        displayTable ? "flex flex-col gap-5 mt-16 ml-20 p-5 h-full" : ""
      }
    >
      {displayTable && (
        <>
          <div className="flex justify-end">
            <Button
              label="Add Patient"
              color="#009999"
              onClick={handleAddPatientButtonClick}
            />
          </div>
          <Table
            displayedPatients={displayedPatients}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            patients={patients}
            setDisplayedPatients={setDisplayedPatients}
            handleUpdateForm={handleUpdateForm}
            handleScheduleForm={handleScheduleForm}
          />
        </>
      )}
      <Modal
        title="Register Patient"
        open={displayRegisterForm}
        onCancel={() => {
          setDisplayRegisterForm(false);
          setDisplayTable(true);
        }}
        width="55vw"
        style={{
          height: "80vh !important",
        }}
        footer={null}
      >
        <RegisterForm
          key={displayRegisterForm ? `register-form-${Date.now()}` : ""}
          handleRegisterPatientButtonClick={handleRegisterPatientButtonClick}
        />
      </Modal>
      {displayUpdateForm &&
        <Modal
          style={modalStyle.content}
          open={displayUpdateForm}
          width="80vw"
          getContainer={document.body}
          onCancel={handleCancel}
          footer={null}
        >
          <TAVRWorkflowForm
            patient={selectedPatient}
            updateProgress={updateProgress}
            updatePatientCheckboxes={updatePatientCheckboxes}
          />
        </Modal>}
      {displayScheduleForm && <ScheduleForm patient={selectedPatient} />}
    </div>
  );
}
