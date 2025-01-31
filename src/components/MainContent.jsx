import { useState } from "react";

import Table from "./Table";
import Button from "./Button";
import RegisterForm from "./RegisterForm";
import UpdateForm from "./UpdateForm";
import ScheduleForm from "./ScheduleForm";
import '../index.css'; 

import { patients } from "../data/patients";

export default function MainContent() {
  const [displayTable, setDisplayTable] = useState(true);
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
  const [displayUpdateForm, setDisplayUpdateForm] = useState(false);
  const [displayScheduleForm, setDisplayScheduleForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  function resetDisplay() {
    setDisplayTable(false);
    setDisplayUpdateForm(false);
    setDisplayScheduleForm(false);
    setDisplayRegisterForm(false);
  }

  const itemsPerPage = 10;
  const totalPages = Math.ceil(patients.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPatients, setDisplayedPatients] = useState(
    patients.length <= itemsPerPage ? patients : patients.slice(0, itemsPerPage)
  );

  const handleAddPatientButtonClick = () => {
    resetDisplay();
    setDisplayRegisterForm(true);
  };

  const handleCancelAddPatientButtonClick = () => {
    resetDisplay();
    setDisplayTable(true);
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
      {displayRegisterForm && (
        <RegisterForm
          handleCancelButtonClick={handleCancelAddPatientButtonClick}
        />
      )}
      {displayUpdateForm && <UpdateForm patient={selectedPatient} />}
      {displayScheduleForm && <ScheduleForm patient={selectedPatient} />}
    </div>
  );
}
