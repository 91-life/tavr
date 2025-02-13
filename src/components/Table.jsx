import Button from "./Button";
import Pagination from "./Pagination";

import { InformationCircleIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export default function Table({
  displayedPatients,
  totalPages,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  patients,
  setDisplayedPatients,
  handleUpdateForm,
  handleScheduleForm,
}) {
  return (
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="p-3 text-left text-sm font-semibold text-gray-500"
                >
                  Patient
                </th>
                <th
                  scope="col"
                  className="p-3 text-center text-sm font-semibold text-gray-500"
                >
                  Doctor
                </th>
                <th
                  scope="col"
                  className="p-3 text-center text-sm font-semibold text-gray-500"
                >
                  Diagnosis
                </th>
                <th
                  scope="col"
                  className="p-3 text-center text-sm font-semibold text-gray-500"
                >
                  Latest Echo
                </th>
                <th
                  scope="col"
                  className="p-3 text-center text-sm font-semibold text-gray-500"
                >
                  Latest CT Scan
                </th>
                <th
                  scope="col"
                  className="p-3 text-center text-sm font-semibold text-gray-500"
                >
                  Appointment
                </th>
                <th
                  scope="col"
                  className="p-3 text-center text-sm font-semibold text-gray-500"
                >
                  Device Rep. Interpretation
                </th>
                
                <th
                  scope="col"
                  className="p-3 text-center text-sm font-semibold text-gray-500"
                >
                  Index Scores
                </th>
                <th
                  scope="col"
                  className="p-3 text-center text-sm font-semibold text-gray-500"
                >
                  <div className="flex gap-1">
                    <span>Timeline</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#475467"
                      className="w-5 h-5"
                    >
                      <path d="M12 16L4 8h16l-8 8z" />
                    </svg>
                  </div>
                </th>
                <th
                  scope="col"
                  className="p-3 text-center text-sm font-semibold text-gray-500"
                >
                 
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {displayedPatients.map((patient) => (
                <tr>
                  <td className="block min-h-[100px] p-3 text-sm text-gray-900">
                    <div>
                      <p className="font-semibold mb-1">{patient.name}</p>
                      <span className="whitespace-nowrap">
                        {patient.dateOfBirth} -
                      </span>
                      {patient.MRI}
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-900">
                    {patient.doctor}
                  </td>
                  <td className="p-3 text-sm text-gray-900 font-semibold text-center">
                    <div className="rounded-[6px] bg-[#EAECF0] py-[2px] px-[8px] inline-block">
                      {patient.diagnosis}
                    </div>
                  </td>
                  <td
                    className="p-3 underline text-sm"
                    style={{ color: patient.latestEcho.color || "#009758" }}
                  >
                    {patient.latestEcho.date || "---"}
                  </td>
                  <td
                    className="p-3 underline text-sm text-center"
                    style={{ color: patient.latestCTScan.color || "#2654EB" }}
                  >
                    {patient.latestCTScan.date || `---`}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm text-center">
                    <div className="flex gap-1 ">
                      <span
                        className="underline"
                        style={{
                          color: patient.appointment.color || "#039F5E",
                        }}
                      >
                        {patient.appointment.date || `---`}
                      </span>
                      <InformationCircleIcon
                        aria-hidden="true"
                        className="size-5"
                        color="#2654EB"
                      />
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-400">
                    {patient.dvcRepIntpr}
                  </td>
                  
                  <td
                    className={classNames(
                      isEmpty(patient.indexScores)
                        ? "text-center text-sm"
                        : "text-xs",
                      "whitespace-nowrap px-5 py-4 text-gray-900"
                    )}
                  >
                    {isEmpty(patient.indexScores) ? (
                      "---"
                    ) : (
                      <div className="flex flex-col">
                        {patient.indexScores.kccScore && (
                          <div className="flex gap-1">
                            KCC Score:
                            <span className="rounded-[4px] border border-[#DDE0E5] p-[2px]">
                              {patient.indexScores.kccScore}
                            </span>
                          </div>
                        )}
                        {patient.indexScores.katzIndexScore && (
                          <div className="flex gap-1">
                            KATZ Index Score:
                            <span className="rounded-[4px] border border-[#DDE0E5] p-[2px]">
                              {patient.indexScores.katzIndexScore
                                .toString()
                                .padStart(2, "0")}
                            </span>
                          </div>
                        )}
                        {patient.indexScores.stsScore && (
                          <div className="flex gap-1">
                            STS Score:
                            <span className="rounded-[4px] border border-[#DDE0E5] p-[2px]">
                              {patient.indexScores.stsScore}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td
                    className="p-3 text-xs"
                    style={{
                      color: "#009999",
                    }}
                  >
                    <div className="flex gap-1">
                      <span className="font-medium">
                      { patient.timeline.progress.seventh == '#009999' ? "Final Decision" :
                      patient.timeline.progress.sixth == '#009999' ? "Final Decision" :
                      patient.timeline.progress.fifth == '#009999' ? "Review Process" :
                      patient.timeline.progress.fourth == '#009999' ? "Documentation" :
                      patient.timeline.progress.third == '#009999' ? "CT Scan" : 
                      patient.timeline.progress.second == '#009999' ? "CTS Consultation" :
                      patient.timeline.progress.first == '#009999' ? "Initial Consultation" :  "Appointment & Echo"}
                      </span>
                      {patient.timeline.status.includeArrow && (
                        <div className="mt-[3px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#475467"
                            className="w-2.5 h-2.5"
                          >
                            <path d="M0 2 L24 2 L12 14 Z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      <div
                        className="min-w-2 min-h-2 aspect-square rounded-full border border-[#000000]"
                        style={{
                          background:
                            patient.timeline.progress.first === "#d9d9d9" ? "#ffffff" : (patient.timeline.progress.first || "#ffffff"),
                        }}
                      />
                      <div
                        className="min-w-2 min-h-2 aspect-square rounded-full border border-[#000000]"
                        style={{
                          background:
                            patient.timeline.progress.second === "#d9d9d9" ?  "#ffffff" : (patient.timeline.progress.second || "#ffffff"),
                        }}
                      />
                      <div
                        className="min-w-2 min-h-2 aspect-square rounded-full border border-[#000000]"
                        style={{
                          background:
                            patient.timeline.progress.third === "#d9d9d9" ? "#ffffff" : (patient.timeline.progress.third || "#ffffff"),
                        }}
                      />
                      <div
                        className="min-w-2 min-h-2 aspect-square rounded-full border border-[#000000]"
                        style={{
                          background:
                            patient.timeline.progress.fourth === "#d9d9d9" ? "#ffffff" : (patient.timeline.progress.fourth || "#ffffff"),
                        }}
                      />
                      <div
                        className="min-w-2 min-h-2 aspect-square rounded-full border border-[#000000]"
                        style={{
                          background:
                            patient.timeline.progress.fifth === "#d9d9d9" ? "#ffffff" : (patient.timeline.progress.fifth || "#ffffff"),
                        }}
                      />
                      <div
                        className="min-w-2 min-h-2 aspect-square rounded-full border border-[#000000]"
                        style={{
                          background:
                            patient.timeline.progress.sixth === "#d9d9d9" ? "#ffffff" : (patient.timeline.progress.sixth || "#ffffff"),
                        }}
                      />
                      <div
                        className="min-w-2 min-h-2 aspect-square rounded-full border border-[#000000]"
                        style={{
                          background:
                            patient.timeline.progress.seventh === "#d9d9d9" ? "#ffffff" : (patient.timeline.progress.seventh || "#ffffff"),
                        }}
                      />
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center">
                      <Button
                        onClick={() => handleUpdateForm(patient)
                        }
                        label={"Update Patient"}
                        color={"#009999"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td colspan={11} className="p-3">
                  <Pagination
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    patients={patients}
                    setDisplayedPatients={setDisplayedPatients}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}