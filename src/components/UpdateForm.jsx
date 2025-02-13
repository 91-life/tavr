import { useState } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { DatePicker, Select } from "antd";
import { doctors } from "../data/doctors";

function UpdateForm({ patient, handleUpdatePatient }) {

  const [formData, setFormData] = useState({
    firstName: patient?.name.split(" ")[0] || "",
    lastName: patient?.name.split(" ")[1] || "",
    dateOfBirth: patient?.dateOfBirth || "",
    age: patient?.age || "",
    gender: patient?.gender || "",
    mrn: patient?.MRI || "",
    diagnosis: patient?.diagnosis || "",
    echoDate: patient?.latestEcho?.date || "",
    consultationAppointment: patient?.appointment?.date || "",
    physician: patient?.doctor || "",
    kccq: patient?.indexScores?.kccScore || "",
    katz: patient?.indexScores?.katzIndexScore || "",
    sts: patient?.indexScores?.stsScore || "",
    pwt: patient?.pwt || "",
    ctsConsultation: patient?.ctsConsultation || "",
    cardiacCath: patient?.cardiacCath || "",
    ctTavrProtocol: patient?.ctTavrProtocol || "",
    tooltipInputCTS: patient?.tooltipInputCTS || "",
    tooltipInputCath: patient?.tooltipInputCath || "",
    tooltipInputTAVR: patient?.tooltipInputTAVR || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date, dateString, fieldName) => {
    setFormData({ ...formData, [fieldName]: dateString });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPatient = {
      ...patient,
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`,
      MRI: formData.mrn,
      doctor: formData.physician,
      latestEcho: { date: formData.echoDate },
      appointment: { date: formData.consultationAppointment },
      indexScores: {
        kccScore: formData.kccq,
        katzIndexScore: formData.katsIndexScore,
        stsScore: formData.stsScore,
      },
      pwt: formData.pwt,
      ctsConsultation: formData.ctsConsultation,
      cardiacCath: formData.cardiacCath,
      ctTavrProtocol: formData.ctTavrProtocol,
      cathAppointment: formData.cathAppointment,
      ctsAppointment: formData.ctsAppointment,
    };

    handleUpdatePatient(updatedPatient);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 p-2 h-full">
      <div className="FormField grid justify-items-end h-1/2">
        <div className="h-20">
          <label
            htmlFor="First Name"
            className="block text-sm/6 font-medium text-gray-900"
          >
            First Name:
          </label>
          <div className="mt-2 w-96">
            <input
              id="firstName"
              name="firstName"
              type="text"
              defaultValue={patient?.name.split(" ")[0] || ""}
              placeholder={"N/A"}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="h-20">
          <label
            htmlFor="lastName"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Last Name:
          </label>
          <div className="mt-2 w-96">
            <input
              id="lastName"
              name="lastName"
              type="text"
              defaultValue={patient?.name.split(" ")[1] || ""}
              placeholder={"Last Name"}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="h-20">
          <label
            htmlFor="dateOfBirth"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Date Of Birth:
          </label>
          <div className="mt-2 w-96">
            <DatePicker
              id="dateOfBirth"
              name="dateOfBirth"
              format="DD/MM/YY"
              placeholder="DD/MM/YY"
              className="col-start-1 row-start-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
              onChange={(date, dateString) => handleDateChange(date, dateString, "dateOfBirth")}
            />
          </div>
        </div>
        <div className="h-20">
          <label
            htmlFor="gender"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Gender:
          </label>
          <div className="mt-2 w-96">
            <input
              id="gender"
              name="gender"
              type="text"
              defaultValue={patient.gender}
              placeholder={"Gender"}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="h-20">
          <label
            htmlFor="mrn"
            className="block text-sm/6 font-medium text-gray-900"
          >
            MRN:
          </label>
          <div className="mt-2 w-96">
            <input
              id="mrn"
              name="mrn"
              type="text"
              defaultValue={patient.MRI}
              placeholder={"MRN"}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="h-20 pt-1">
          <label
            htmlFor="diagnosis"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Diagnosis:
          </label>
          <div className="mt-2 w-96 grid grid-cols-1">
            <input
              id="diagnosis"
              name="diagnosis"
              type="text"
              defaultValue={patient.diagnosis}
              placeholder="Diagnosis"
              className="col-start-1 row-start-1 sm:pl-9 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
              onChange={handleChange}
            />
            <MagnifyingGlassIcon className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"></MagnifyingGlassIcon>
          </div>
        </div>
      </div>
      <div className="FormField flex-row h-1/2">
        <div className="h-20">
          <label
            htmlFor="echoDate"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Echo Date:
          </label>
          <div className="mt-2 w-96 grid grid-cols-1">
            <DatePicker
              id="echoDate"
              name="echoDate"
              format="DD/MM/YY"
              placeholder="DD/MM/YY"
              className="col-start-1 row-start-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
              onChange={(date, dateString) => handleDateChange(date, dateString, "echoDate")}
            />
          </div>
        </div>
        <div className="h-20">
          <label
            htmlFor="consultationAppointment"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Consultation Appointment:
          </label>
          <div className="mt-2 w-96 grid grid-cols-1">
            <DatePicker
              id="consultationAppointment"
              name="consultationAppointment"
              format="DD/MM/YY"
              placeholder="DD/MM/YY"
              className="col-start-1 row-start-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
              onChange={(date, dateString) => handleDateChange(date, dateString, "consultationAppointment")}
            />
          </div>
        </div>
        <div className="h-20">
          <label
            htmlFor="physician"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Physician:
          </label>
          <div className="mt-2 w-96 grid grid-cols-1">
            <Select
              id="physician"
              name="physician"
              type="text"
              defaultValue={patient.doctor}
              placeholder="Select a Physician"
              onChange={(value) => setFormData({ ...formData, physician: value })}
            >
              {doctors.map((doctor, index) => (
                <Select.Option key={index} value={doctor}>
                  {doctor}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="pt-3 flex justify-start items-center">
          <label
            htmlFor="kccq"
            className="block text-sm/6 font-medium text-gray-900"
          >
            KCCQ Score:
          </label>
          <input
            id="kccq"
            name="kccq"
            type="text"
            defaultValue={patient.indexScores.kccScore}
            placeholder=""
            className="ml-3 block w-10 border border-gray-300 rounded-lg px-1 py-2 focus:outline-indigo-600 text-center"
          />
        </div>
        <div className="flex justify-start items-center">
          <label
            htmlFor="katz"
            className="block text-sm/6 font-medium text-gray-900"
          >
            KATZ Index Score:
          </label>
          <input
            id="katz"
            name="katz"
            type="text"
            defaultValue={patient.indexScores.katzIndexScore}
            placeholder=""
            className="ml-3 block w-10 border border-gray-300 rounded-lg px-1 py-2 focus:outline-indigo-600 text-center"
          />
        </div>
        <div className="flex justify-start items-center">
          <label
            htmlFor="sts"
            className="block text-sm/6 font-medium text-gray-900"
          >
            STS Score:
          </label>
          <input
            id="katz"
            name="katz"
            type="text"
            defaultValue={patient.indexScores.stsScore}
            placeholder=""
            className="ml-3 block w-10 border border-gray-300 rounded-lg px-1 py-2 focus:outline-indigo-600 text-center"
          />
        </div>
        <div className="flex justify-between items-center h-12 w-56">
          <label
            htmlFor="pwt"
            className="block text-sm/6 font-medium text-gray-900 pr-3"
          >
            Patient Walk Test:
          </label>
          <select
            id="pwt"
            name="pwt"
            type="text"
            placeholder="Yes/No"
            defaultValue={""}
            className="block w-15 border border-gray-300 rounded-lg px-2 py-2 focus:outline-indigo-600"
          >
            <option disabled value={""}>
              Yes/No
            </option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="flex pt-1 h-14">
          <div className="flex justify-between items-center h-12 w-56">
            <label
              htmlFor="ctsConsultation"
              className="block text-sm/6 font-medium text-gray-900 pr-3"
            >
              CTS Consultation:
            </label>
            <select
              id="ctsConsultation"
              name="ctsConsultation"
              type="text"
              placeholder="Yes/No"
              defaultValue={""}
              className="block w-15 border border-gray-300 rounded-lg px-2 py-2 focus:outline-indigo-600"
            >
              <option disabled value={""}>
                Yes/No
              </option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="relative appointmentTip justify-center items-center px-3 ml-3 bg-gray-200 rounded-lg text-center flex-row text-sm">
            <span>CTS Appointment</span>
            <div className="flex justify-center items-center gap-1">
              <label htmlFor="tooltipInputCTS">
                <CalendarIcon className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"></CalendarIcon>
              </label>
              <input
                id="tooltipInputCTS"
                className="bg-gray-200 justify-start w-24 px-1 py-1 rounded-lg focus:outline-indigo-600"
                placeholder="MM/DD/YY"
              ></input>
            </div>
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-transparent border-r-8 border-r-gray-200"></div>
          </div>
        </div>
        <div className="flex pt-1 h-14">
          <div className="flex justify-between items-center h-12 w-56">
            <label
              htmlFor="cardiacCath"
              className="block text-sm/6 font-medium text-gray-900 pr-3"
            >
              Cardiac Cath:
            </label>
            <select
              id="cardiacCath"
              name="cardiacCath"
              type="text"
              placeholder="Yes/No"
              defaultValue={""}
              className="block w-15 border border-gray-300 rounded-lg px-2 py-2 focus:outline-indigo-600"
            >
              <option disabled value={""}>
                Yes/No
              </option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="relative appointmentTip justify-center items-center px-3 ml-3 bg-gray-200 rounded-lg text-center flex-row text-sm">
            <span>Cath Appointment</span>
            <div className="flex justify-center items-center gap-1">
              <label htmlFor="tooltipInputCath">
                <CalendarIcon className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"></CalendarIcon>
              </label>
              <input
                id="tooltipInputCath"
                className="bg-gray-200 justify-start w-24 px-1 py-1 rounded-lg focus:outline-indigo-600"
                placeholder="MM/DD/YY"
              ></input>
            </div>
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-transparent border-r-8 border-r-gray-200"></div>
          </div>
        </div>
        <div className="flex pt-1 h-14">
          <div className="flex justify-between items-center h-12 w-56">
            <label
              htmlFor="ctTavrProtocol"
              className="block text-sm/6 font-medium text-gray-900 pr-3"
            >
              CT TAVR Protocol:
            </label>
            <select
              id="ctTavrProtocol"
              name="ctTavrProtocol"
              type="text"
              placeholder=""
              defaultValue={""}
              className="block w-15 border border-gray-300 rounded-lg px-2 py-2 focus:outline-indigo-600"
            >
              <option disabled value={""}>
                Yes/No
              </option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="relative appointmentTip justify-center items-center px-3 ml-3 bg-gray-200 rounded-lg text-center flex-row text-sm">
            <span>CT TAVR Appointment</span>
            <div className="flex justify-center items-center gap-1">
              <label htmlFor="tooltipInputTAVR">
                <CalendarIcon className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"></CalendarIcon>
              </label>
              <input
                id="tooltipInputTAVR"
                className="bg-gray-200 justify-start w-24 px-1 py-1 rounded-lg focus:outline-indigo-600"
                placeholder="MM/DD/YY"
              ></input>
            </div>
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-transparent border-r-8 border-r-gray-200"></div>
          </div>
        </div>
        <div className="pt-2 w-96 flex justify-end">
          <button
            style={{ backgroundColor: "rgba(0, 153, 153, 1)" }}
            className="bg-green-500 px-4 py-2 rounded-lg text-white"
          >
            Update Patient
          </button>
        </div>
      </div>
    </form>
  );
}

export default UpdateForm;
