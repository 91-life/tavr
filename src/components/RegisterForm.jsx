import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { DatePicker, Select } from "antd";
import { doctors } from "../data/doctors";

function RegisterForm({ handleRegisterPatientButtonClick }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    mrn: "",
    diagnosis: "",
    echoDate: "",
    consultationAppointment: "",
    physician: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateString, fieldName) => {
    setFormData({ ...formData, [fieldName]: dateString });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegisterPatientButtonClick(formData);
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      age: "",
      gender: "",
      mrn: "",
      diagnosis: "",
      echoDate: "",
      consultationAppointment: "",
      physician: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-6 p-6 h-full"
    >
      <div className="FormField grid justify-items-end h-1/2">
        <div className="h-20">
          <label
            htmlFor="firstName"
            className="block text-sm/6 font-medium text-gray-900"
          >
            First Name:
          </label>
          <div className="mt-2 w-96">
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
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
              placeholder="Last Name"
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
              placeholder="Gender"
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="FormField flex-row h-1/2">
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
              placeholder="MRN"
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="h-20">
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
              placeholder="Diagnosis"
              className="col-start-1 row-start-1 sm:pl-9 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
              onChange={handleChange}
            />
            <MagnifyingGlassIcon className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"></MagnifyingGlassIcon>
          </div>
        </div>
        <div className="h-20">
          <label
            htmlFor="echoDate"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Echo Date:
          </label>
          <div className="">
            <div className="flex items-center gap-3 h-8">
              <div className="mt-2 w-40 grid grid-cols-1">
                <DatePicker
                  id="echoDate"
                  name="echoDate"
                  format="DD/MM/YY"
                  placeholder="DD/MM/YY"
                  className="col-start-1 row-start-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
                  onChange={(date, dateString) => handleDateChange(date, dateString, "echoDate")}
                />
              </div>
              <button
                style={{ backgroundColor: "rgba(0, 153, 153, 1)" }}
                className="opacity-70 px-3 py-1 rounded-lg text-white text-sm"
              >
                Upload Echo
              </button>
              <button className="bg-gray-500 px-3 py-1 rounded-lg text-white text-sm">
                Obtain Echo
              </button>
              <div className="relative">
                <span className="infotext w-40 h-16 flex justify-center items-center p-2 bg-gray-200 rounded-lg text-center">
                  Call XYZ office to request echo
                </span>
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-transparent border-r-8 border-r-gray-200"></div>
              </div>
            </div>
            <div className="flex items-center pt-3">
              <p className="text-red-500 text-xs font-semibold">
                If no echo date &gt; 30, 'Schedule Echo' will highlight
              </p>
              <div className="flex h-6 shrink-0 items-center pl-2">
                <div className="group grid size-4 grid-cols-1">
                  <input
                    id="echoAvailable"
                    name="echoAvailable"
                    type="checkbox"
                    aria-describedby="echoAvailable"
                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                    onChange={handleChange}
                  />
                  <svg
                    fill="none"
                    viewBox="0 0 14 14"
                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                  >
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-has-[:checked]:opacity-100"
                    />
                    <path
                      d="M3 7H11"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-has-[:indeterminate]:opacity-100"
                    />
                  </svg>
                </div>
                <div className="text-sm/6 pl-1">
                  <label
                    htmlFor="echoAvailable"
                    className="font-medium text-gray-400"
                  >
                    No echo available
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-20 pt-2">
          <label
            htmlFor="consultationAppointment"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Consultation Appointment:
          </label>
          <div className="mt-2 w-96">
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
        <div className="h-20 pt-1">
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
              placeholder="Select a Physician"
              onChange={(value) => setFormData({ ...formData, physician: value })}
              value={formData.physician}
            >
              {doctors.map((doctor, index) => (
                <Select.Option key={index} value={doctor}>
                  {doctor}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="pt-2 w-96 flex justify-end">
          <button
            style={{ backgroundColor: "rgba(0, 153, 153, 1)" }}
            className="px-4 py-2 rounded-lg text-white"
          >
            Register Patient
          </button>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
