import { CalendarIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function ScheduleForm({ patient }) {
  return (
    <form className="flex w-screen h-screen justify-center items-center gap-9 pl-24 pb-96">
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
              defaultValue={patient?.name.split(" ")[0] || ""}
              placeholder={"N/A"}
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
              defaultValue={patient?.name.split(" ")[1] || ""}
              placeholder={"N/A"}
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
              defaultValue={patient.dateOfBirth}
              placeholder="DD/MM/YY"
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
              defaultValue={patient.age}
              placeholder={"N/A"}
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
              defaultValue={patient.gender}
              placeholder={"-"}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
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
              placeholder={"-"}
              className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
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
              placeholder="-"
              className="col-start-1 row-start-1 sm:pl-9 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
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
            <input
              id="echoDate"
              name="echoDate"
              type="text"
              defaultValue={patient.latestEcho.date}
              placeholder="DD/MM/YY"
              className="col-start-1 row-start-1 sm:pl-9 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
            />
            <CalendarIcon className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"></CalendarIcon>
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
            <input
              id="consultationAppointment"
              name="consultationAppointment"
              type="text"
              defaultValue={patient.appointment.date}
              placeholder="DD/MM/YY"
              className="col-start-1 row-start-1 sm:pl-9 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
            />
            <CalendarIcon className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"></CalendarIcon>
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
            <input
              id="physician"
              name="physician"
              type="text"
              defaultValue={patient.doctor}
              placeholder=""
              className="col-start-1 row-start-1 sm:pl-9 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
            />
            <MagnifyingGlassIcon className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"></MagnifyingGlassIcon>
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
        <div className="flex justify-between items-center h-14 w-56">
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
      </div>
      <div className="FormField flex-row h-1/2">
        <div className="flex justify-between items-center h-14 w-72">
          <label
            htmlFor="continueTAVR"
            className="block text-sm/6 font-medium text-gray-900 pr-3"
          >
            Continue TAVR Workup:
          </label>
          <select
            id="continueTAVR"
            name="continueTAVR"
            type="text"
            placeholder="Yes/No"
            defaultValue=""
            className="block w-15 border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
          >
            <option disabled value={""}>
              Yes/No
            </option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="flex justify-between items-center h-14 w-72">
          <label
            htmlFor="ctScanUploaded"
            className="block text-sm/6 font-medium text-gray-900 pr-3"
          >
            CT Scan Uploaded:
          </label>
          <select
            id="ctScanUploaded"
            name="ctScanUploaded"
            type="text"
            placeholder="Yes/No"
            defaultValue=""
            className="block w-15 border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
          >
            <option disabled value={""}>
              Yes/No
            </option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="flex justify-between items-center h-14 w-72">
          <label
            htmlFor="drReviewed"
            className="block text-sm/6 font-medium text-gray-900 pr-3"
          >
            Dr. has reviewed device reps findings:
          </label>
          <select
            id="drReviewed"
            name="drReviewed"
            type="text"
            placeholder="Yes/No"
            defaultValue=""
            className="block w-15 border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
          >
            <option disabled value={""}>
              Yes/No
            </option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="flex h-14">
          <div className="flex justify-between items-center h-12d w-72">
            <label
              htmlFor="otherTAVR"
              className="block text-sm/6 font-medium text-gray-900 pr-3"
            >
              Other pre TAVR testing:
            </label>
            <select
              id="otherTAVR"
              name="otherTAVR"
              type="text"
              placeholder=""
              defaultValue={""}
              className="block w-15 border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
            >
              <option disabled value={""}>
                Yes/No
              </option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div className="relative appointmentTip justify-center items-center px-3 py-1 ml-3 bg-gray-200 rounded-lg text-center flex-row text-sm">
            <span>Other Test Appointment</span>
            <div className="flex justify-center items-center gap-1">
              <label htmlFor="tooltipInputOther">
                <CalendarIcon className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"></CalendarIcon>
              </label>
              <input
                id="tooltipInputOther"
                className="bg-gray-200 justify-start w-24 px-1 py-1 rounded-lg focus:outline-indigo-600"
                placeholder="MM/DD/YY"
              ></input>
            </div>
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-transparent border-r-8 border-r-gray-200"></div>
          </div>
        </div>
        <div className="flex justify-between items-center h-14 w-72">
          <label
            htmlFor="completedTAVR"
            className="block text-sm/6 font-medium text-gray-900 pr-3"
          >
            TAVR workup Completed:
          </label>
          <select
            id="completedTAVR"
            name="completedTAVR"
            type="text"
            placeholder="Yes/No"
            defaultValue=""
            className="block w-15 border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
          >
            <option disabled value={""}>
              Yes/No
            </option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="flex justify-between items-center h-14 w-72">
          <label
            htmlFor="powerPointCompleted"
            className="block text-sm/6 font-medium text-gray-900 pr-3"
          >
            PowerPoint Completed:
          </label>
          <select
            id="powerPointCompleted"
            name="powerPointCompleted"
            type="text"
            placeholder="Yes/No"
            defaultValue=""
            className="block w-15 border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
          >
            <option disabled value={""}>
              Yes/No
            </option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="flex justify-between items-center h-14 w-72">
          <label
            htmlFor="discussSH"
            className="block text-sm/6 font-medium text-gray-900 pr-3"
          >
            Discuss at SH meeting:
          </label>
          <select
            id="discussSH"
            name="discussSH"
            type="text"
            placeholder="Yes/No"
            defaultValue=""
            className="block w-15 border border-gray-300 rounded-lg px-3 py-2 focus:outline-indigo-600"
          >
            <option disabled value={""}>
              Yes/No
            </option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="flex h-14">
          <div className="pt-2 w-72 flex justify-end">
            <button className="bg-orange-500 px-4 rounded-lg text-white h-10">
              Schedule TAVR
            </button>
          </div>
          <div className="relative appointmentTip justify-center items-center px-3 py-1 ml-3 bg-gray-200 rounded-lg text-center flex-row text-sm">
            <span>TAVR Appointment</span>
            <div className="flex justify-center items-center gap-1">
              <label htmlFor="tooltipInputTAVRAppointment">
                <CalendarIcon className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"></CalendarIcon>
              </label>
              <input
                id="tooltipInputTAVRAppointment"
                className="bg-gray-200 justify-start w-24 px-1 py-1 rounded-lg focus:outline-indigo-600"
                placeholder="MM/DD/YY"
              ></input>
            </div>
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-transparent border-r-8 border-r-gray-200"></div>
          </div>
        </div>
        <div className="flex w-72 pt-4 justify-center items-center">
          <p className="text-xs text-red-600 font-semibold text-center">
            If all conditions met “Schedule TAVR” will turn blue. Once TAVR is
            scheduled the date will fill in
          </p>
        </div>
      </div>
    </form>
  );
}

export default ScheduleForm;
