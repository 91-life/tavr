import { useState } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
      className="flex w-screen h-screen justify-center items-center gap-9 pl-32"
    >
      <div className="FormField flex-row h-1/2">
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
              placeholder="N/A"
              value={formData.firstName}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
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
              placeholder="N/A"
              value={formData.lastName}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
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
          <div className="mt-2 w-96 grid grid-cols-1">
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="text"
              placeholder="DD/MM/YY"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="col-start-1 row-start-1 sm:pl-9 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
            />
            <CalendarIcon className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"></CalendarIcon>
          </div>
        </div>
        <div className="h-20">
          <label
            htmlFor="age"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Age:
          </label>
          <div className="mt-2 w-96">
            <input
              id="age"
              name="age"
              type="text"
              placeholder="-"
              value={formData.age}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
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
              placeholder="-"
              value={formData.gender}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
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
              placeholder="-"
              value={formData.mrn}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
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
              placeholder=""
              value={formData.diagnosis}
              onChange={handleChange}
              className="col-start-1 row-start-1 sm:pl-9 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
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
                <input
                  id="echoDate"
                  name="echoDate"
                  type="text"
                  placeholder="DD/MM/YY"
                  value={formData.echoDate}
                  onChange={handleChange}
                  className="col-start-1 row-start-1 sm:pl-9 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
                />
                <CalendarIcon className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"></CalendarIcon>
              </div>
              <button className="bg-green-700 opacity-70 px-3 py-1 rounded-lg text-white text-sm">
                Upload Echo
              </button>
              <button className="bg-gray-500 px-3 py-1 rounded-lg text-white text-sm">
                Obtain Echo
              </button>
              <span className="infotext w-40 h-16 flex justify-center items-center p-2 bg-gray-200 rounded-lg text-center">
                Call XYZ office to request echo
              </span>
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
          <div className="mt-2 w-96 grid grid-cols-1">
            <input
              id="consultationAppointment"
              name="consultationAppointment"
              type="text"
              placeholder="DD/MM/YY"
              value={formData.consultationAppointment}
              onChange={handleChange}
              className="col-start-1 row-start-1 sm:pl-9 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
            />
            <CalendarIcon className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"></CalendarIcon>
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
            <input
              id="physician"
              name="physician"
              type="text"
              placeholder=""
              value={formData.physician}
              onChange={handleChange}
              className="col-start-1 row-start-1 sm:pl-9 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
            />
            <MagnifyingGlassIcon className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"></MagnifyingGlassIcon>
          </div>
        </div>
        <div className="pt-2 w-96 flex justify-end">
          <button
            type="submit"
            className="bg-green-700 px-4 py-2 rounded-lg text-white"
          >
            Register Patient
          </button>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
