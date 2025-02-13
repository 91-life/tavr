"use client"

import moment from "moment"
import { useState, useEffect, useRef } from "react"
import { Form, Checkbox, DatePicker, Typography, Card, Row, Col, Steps, Radio, Input} from "antd"
import { CheckCircleFilled } from "@ant-design/icons"
import TextArea from "antd/es/input/TextArea"

const { Title, Text } = Typography
const { Step } = Steps

const formatDate = (dateString) => {
  if (!dateString) return null;
  return moment(dateString);
};

const StageStatus = ({ status }) => {
  const statusColors = {
    completed: "#52c41a",
    inProgress: "#faad14",
    pending: "#d9d9d9",
  }

  return (
    <Text style={{ color: statusColors[status], textTransform: "capitalize" }}>
      {status === "completed" && <CheckCircleFilled style={{ marginRight: 8 }} />}
      {status}
    </Text>
  )
}

const Stage = ({ title, children, status, innerRef, noNeeded, number, handleProgressUpdate }) => (
  <Card
    ref={innerRef}
    title={
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginTop: '9px', marginRight: '7px' }}>
        <Title level={4}>{title}</Title>
        </div>
        {noNeeded &&<Checkbox onChange={(e) => handleProgressUpdate(number, e.target.checked ? "completed" : "pending")}>
          Not needed
        </Checkbox>}
        </div>
        <StageStatus status={status} />
      </div>
    }
    style={{ marginBottom: 24 }}
  >
    {children}
  </Card>
)

const PatientInfo = (patient) => (
  <Card title="Patient Information" style={{ marginBottom: 24 }}>
    <Row gutter={16}>
      <Col span={12}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <strong>Patient Name:</strong>
          <Text style={{ display: 'block', color: '#595959', marginLeft: '4px' }}>{patient.name}</Text>
        </div>
      </Col>
      <Col span={12}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <strong>MRN:</strong>
          <Text style={{ display: 'block', color: '#595959', marginLeft: '4px' }}>{patient.MRI}</Text>
        </div>
      </Col>
      <Col span={12}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <strong>DOB:</strong>
          <Text style={{ display: 'block', color: '#595959', marginLeft: '4px' }}>{patient.dateOfBirth}</Text>
        </div>
      </Col>
      <Col span={12}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <strong>Gender:</strong>
          <Text style={{ display: 'block', color: '#595959', marginLeft: '4px' }}>{patient.gender || 'N/A'}</Text>
        </div>
      </Col>
    </Row>
  </Card>
)

const SidePanel = ({ stages }) => (
  <Card title="Stages" style={{ position: "sticky" }}>
    <Steps direction="vertical" size="small" current={stages.findIndex((stage) => stage.status === "inProgress")}>
      {stages.map((stage, index) => (
        <Step
          key={index}
          title={stage.title}
          status={stage.status === "completed" ? "finish" : stage.status === "inProgress" ? "process" : "wait"}
          icon={stage.status === "completed" ? <CheckCircleFilled /> : null}
        />
      ))}
    </Steps>
  </Card>
)

const TAVRWorkflowForm = ({ patient, updateProgress, updatePatientCheckboxes, updateDates }) => {
  const [progress, setProgress] = useState({
    first: patient?.timeline?.progress?.first || "#d9d9d9",
    second: patient?.timeline?.progress?.second || "#d9d9d9",
    third: patient?.timeline?.progress?.third || "#d9d9d9",
    fourth: patient?.timeline?.progress?.fourth || "#d9d9d9",
    fifth: patient?.timeline?.progress?.fifth || "#d9d9d9",
    sixth: patient?.timeline?.progress?.sixth || "#d9d9d9",
    seventh: patient?.timeline?.progress?.seventh || "#d9d9d9",
  });

  const [stages, setStages] = useState([
    { title: "Appointment & Echo", status: patient.timeline.progress.first == '#009999' ? "completed" : "pending" },
    { title: "Initial Consultation", status: patient.timeline.progress.second == '#009999' ? "completed" : "pending" },
    { title: "CTS Consultation", status: patient.timeline.progress.third == '#009999' ? "completed" : "pending" },
    { title: "CT Scan", status: patient.timeline.progress.fourth == '#009999' ? "completed" : "pending" },
    { title: "Documentation", status: patient.timeline.progress.fifth == '#009999' ? "completed" : "pending" },
    { title: "Review Process", status: patient.timeline.progress.sixth == '#009999' ? "completed" : "pending" },
    { title: "Final Decision", status: patient.timeline.progress.seventh == '#009999' ? "completed" : "pending" },
  ])

  useEffect(() => {
    if (patient?.timeline?.progress) {
      setProgress({
        first: patient.timeline.progress.first || "#d9d9d9",
        second: patient.timeline.progress.second || "#d9d9d9",
        third: patient.timeline.progress.third || "#d9d9d9",
        fourth: patient.timeline.progress.fourth || "#d9d9d9",
        fifth: patient.timeline.progress.fifth || "#d9d9d9",
        sixth: patient.timeline.progress.sixth || "#d9d9d9",
        seventh: patient.timeline.progress.seventh || "#d9d9d9",
      });
    }
  }, [patient]);

  const stageRefs = useRef(Array(7).fill(null))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stageIndex = Array.from(stageRefs.current).findIndex((ref) => ref === entry.target)
            if (stageIndex !== -1) {
              setStages((prevStages) =>
                prevStages.map((s, i) => (i === stageIndex ? { ...s, status: "pending" } : s)),
              )
            }
          }
        })
      },
      { threshold: 0.5 },
    )

    stageRefs.current.forEach((ref, index) => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => observer.disconnect()
  }, [])

  const handleProgressUpdate = (stageIndex, status) => {
    setStages((prevStages) => prevStages.map((stage, i) => (i === stageIndex ? { ...stage, status } : stage)))
    const stageStatuses = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh"];
    const newProgress = { ...progress };
    newProgress[stageStatuses[stageIndex]] = status === "completed" ? "#009999" : "#d9d9d9";

    setProgress(newProgress);

    updateProgress(stageIndex, status);
  };

  const [kccq, setKccq] = useState(null);
  const [kccq1, setKccq1] = useState(null);
  const [text1, setText1] = useState(patient?.indexScores?.kccScore || "");
  const [text2, setText2] = useState(patient?.indexScores?.katzIndexScore || "");
  const [text3, setText3] = useState(patient?.indexScores?.stsScore || "");

  return (
    <div style={{ maxWidth: 1300, margin: "0 auto", padding: "7px 7px 7px 0" }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        TAVR Update Form - {patient.name} {patient.MRI}
      </Title>
      {/* <PatientInfo patient={patient}/> */}

      <Row gutter={24}>
        {/* make it scrollable */}
        <Col span={17}>
        <div style={{ overflowY: "scroll", height: "70vh", padding: "0 14px 0 0" }}>
          <Form layout="vertical">
            <Stage
              innerRef={stageRefs.current[0]}
              title="Stage 1 - Appointment Scheduling & Echo"
              status={stages[0].status}
            >
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{marginTop: '5px', marginRight: '5px', width:'170px'}}>Consultation Appointment:</div>
                <Form.Item label="">
                <DatePicker
                      style={{ width: "100%" }}
                      format="DD/MM/YY"
                      defaultValue={patient?.appointment?.date ? formatDate(patient.appointment.date) : null}
                      onChange={(_, date) => updateDates("appointment", date)}
                    />
                </Form.Item>
              </div>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{marginTop: '5px', marginRight: '5px', width:'170px'}}>Latest Echo:</div>
                <Form.Item label="">
                <DatePicker
                      style={{ width: "100%" }}
                      format="DD/MM/YY"
                      defaultValue={patient?.latestEcho?.date ? formatDate(patient.latestEcho.date) : null}
                      onChange={(_, date) => updateDates("latestEcho", date)}
                    />
                </Form.Item>
                <button style={{width: 110,
height: 35,
top: '724px',
left: '1231px',
borderRadius: '6px',
paddingTop: '7px',
paddingRight: '12px',
paddingBottom: '8px',
paddingLeft: '12px',
gap: '10px',
background: '#009999',
color: 'white',
marginLeft: '5px',
}}>Upload Echo</button>
                <button style={{width: 110,
height: 35,
top: '724px',
left: '1231px',
borderRadius: '6px',
paddingTop: '7px',
paddingRight: '12px',
paddingBottom: '8px',
paddingLeft: '12px',
gap: '10px',
background: '#C7C7C7',
color: 'white',
marginLeft: '5px',
}}>Obtain Echo</button>
                {
                  patient?.latestEcho?.date &&
                  (new Date() - new Date(patient.latestEcho.date) > 30 * 24 * 60 * 60 * 1000) && (
                    <div style={{ marginTop: '5px', marginLeft: '10px', marginRight: '5px', width: '170px', color: 'red' }}>
                      Echo older than 30d
                    </div>
                  )
                }
              </div>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{marginTop: '5px', marginRight: '5px', width:'170px'}}>New Echo Appointment:</div>
                <Form.Item label="">
                <DatePicker
                      style={{ width: "100%" }}
                      format="DD/MM/YY"
                      disabled={new Date() - new Date(patient.latestEcho.date) < 30 * 24 * 60 * 60 * 1000}
                      defaultValue={patient.newEcho?.date ? formatDate(patient.newEcho.date) : null}
                      onChange={(_, date) => updateDates("newEcho", date)}
                    />
                </Form.Item>
              </div>
              <Form.Item>
              <Checkbox checked={!!patient?.echoReceivedByProvider} onChange={(e) => {
                    handleProgressUpdate(0, e.target.checked ? "completed" : "pending")
                    updatePatientCheckboxes("echoReceivedByProvider", e.target.checked)
                  }}>
                Echo Received By Provider
                </Checkbox>
              </Form.Item>
            </Stage>

            <Stage innerRef={stageRefs.current[1]} title="Stage 2 - Initial Consultation" status={stages[1].status}>
                <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px', marginTop: '20px'}}>
                  <div style={{ marginRight: '5px', width:'280px'}}>KCCQ, Katz Index Scores and STS Scores:</div>
                  <Radio.Group onChange={(e) => setKccq(e.target.value)} value={kccq}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </Radio.Group>
                </div>
                {kccq === "yes" && (
                 <div>
                 <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                   <div style={{ marginRight: "10px", width: "150px" }}>KCCQ Score:</div>
                   <Input 
                     style={{ width: '100px' }} 
                     type="text" 
                     value={text1} 
                     onChange={(e) => setText1(e.target.value)} 
                   />
                 </div>
               
                 <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                   <div style={{ marginRight: "10px", width: "150px" }}>KATZ Index Score:</div>
                   <Input 
                     style={{ width: '100px' }} 
                     type="text" 
                     value={text2} 
                     onChange={(e) => setText2(e.target.value)} 
                   />
                 </div>
               
                 <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "15px" }}>
                   <div style={{ marginRight: "10px", width: "150px" }}>STS Score:</div>
                   <Input 
                     style={{ width: '100px' }} 
                     type="text" 
                     value={text3} 
                     onChange={(e) => setText3(e.target.value)} 
                   />
                 </div>
               </div>
                )}
                <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
                <Checkbox checked={patient?.canPatientWalk} onChange={(e) => {
                    handleProgressUpdate(1, e.target.checked ? "completed" : "pending")
                    updatePatientCheckboxes("canPatientWalk", e.target.checked)
                  }}>
                    Can patient walk?
                  </Checkbox>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                  <div style={{ marginRight: '5px', width: '280px' }}>Pre-TAVR Walk Test Completed:</div>
                  <Radio.Group >
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </Radio.Group>
                </div>
              </Stage>

            <Stage innerRef={stageRefs.current[2]} title="Stage 3 - CTS Consultation" handleProgressUpdate={handleProgressUpdate} noNeeded={true} number={2} status={stages[2].status}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{marginTop: '5px', marginRight: '5px', width:'170px'}}>CTS Consultation Date:</div>
                <Form.Item label="">
                <DatePicker
                        style={{ width: "100%" }}
                        format="DD/MM/YY"
                        defaultValue={!!patient?.ctsConsultation?.date ? formatDate(patient.ctsConsultation.date) : null}
                        onChange={(_, date) => updateDates("ctsConsultation", date)}
                      />
                </Form.Item>
              </div>
              <div style={{marginTop: '5px', marginLeft: '25px'}}>
              <Checkbox checked={!!patient?.ctsConsultationDateNotNeeded} onChange={(e) => {
                      handleProgressUpdate(2, e.target.checked ? "completed" : "pending");
                      updatePatientCheckboxes("ctsConsultationDateNotNeeded", e.target.checked)
                    }}>
                  Not needed
                </Checkbox>
              </div>
              </div>
              <Form.Item>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                <Checkbox checked={!!patient?.ctsConsultationCompleted} onChange={(e) => {
                      handleProgressUpdate(2, e.target.checked ? "completed" : "pending");
                      updatePatientCheckboxes("ctsConsultationCompleted", e.target.checked)
                    }}>
                  CTS Consultation Completed
                </Checkbox>
                <div style={{marginLeft: '15px'}}>
                <Checkbox checked={!!patient?.ctScanCompletedNotNeeded} onChange={(e) => {
                        handleProgressUpdate(2, e.target.checked ? "completed" : "pending");
                        updatePatientCheckboxes("ctScanCompletedNotNeeded", e.target.checked)
                      }}>
                  Not needed
                </Checkbox>
                </div>
                </div>
              </Form.Item>
            </Stage>

            <Stage innerRef={stageRefs.current[3]} title="Stage 4 - CT Scan" handleProgressUpdate={handleProgressUpdate} noNeeded={true} number={3} status={stages[3].status}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{marginTop: '5px', marginRight: '5px'}}>CT Scan Date:</div>
              <Form.Item label="">
              <DatePicker
                      style={{ width: "100%" }}
                      format="DD/MM/YY"
                      defaultValue={patient?.ctScan?.date ? formatDate(patient.ctScan.date) : null}
                      onChange={(_, date) => updateDates("ctScan", date)}
                    />
              </Form.Item>
              </div>
              
              <Form.Item>
                <Checkbox>CT Scan Completed</Checkbox>
              </Form.Item>
              <Form.Item>
              <Checkbox checked={!!patient?.ctScanUploaded} onChange={(e) => {
                    handleProgressUpdate(3, e.target.checked ? "completed" : "pending")
                    updatePatientCheckboxes("ctScanUploaded", e.target.checked)
                  }}>
                  CT Scan Uploaded
                </Checkbox>
              </Form.Item>
            </Stage>

              <Stage innerRef={stageRefs.current[4]} title="Stage 5 - Documentation" status={stages[4].status}>
                <Form.Item>
                  <Checkbox>Patient Info Worksheet Completed</Checkbox><button style={{width: 80,
height: 35,
top: '724px',
left: '1231px',
borderRadius: '6px',
paddingTop: '7px',
paddingRight: '12px',
paddingBottom: '8px',
paddingLeft: '12px',
gap: '10px',
background: '#009999',
color: 'white',
marginLeft: '5px',
}}>Upload</button>                </Form.Item>
                <Form.Item>
                  <Checkbox checked={!!patient?.powerPointCreated} onChange={(e) => {
                    handleProgressUpdate(4, e.target.checked ? "completed" : "pending");
                    updatePatientCheckboxes("powerPointCreated", e.target.checked)
                  }}>
                    PowerPoint Created
                  </Checkbox>
                  <button style={{width: 80,
height: 35,
top: '724px',
left: '1231px',
borderRadius: '6px',
paddingTop: '7px',
paddingRight: '12px',
paddingBottom: '8px',
paddingLeft: '12px',
gap: '10px',
background: '#009999',
color: 'white',
marginLeft: '5px',
}}>Upload</button>
                </Form.Item>
              </Stage>

              <Stage innerRef={stageRefs.current[5]} title="Stage 6 - Review Process" status={stages[5].status}>
                <Form.Item>
                  <Checkbox>Device Rep Reviewed</Checkbox>
                  <TextArea style={{marginTop:'10px'}} placeholder="Notes"></TextArea>
                </Form.Item>
                <Form.Item>
                  <Checkbox checked={!!patient?.doctorReviewCompleted} onChange={(e) => {
                    handleProgressUpdate(5, e.target.checked ? "completed" : "pending");
                    updatePatientCheckboxes("doctorReviewCompleted", e.target.checked)
                  }}>
                    Doctor Review Completed
                  </Checkbox>
                  <TextArea style={{marginTop:'10px'}} placeholder="Notes"></TextArea>
                </Form.Item>
              </Stage>

            <Stage
              innerRef={stageRefs.current[6]}
              title="Stage 7 - Final Decision & Scheduling"
              status={stages[6].status}
            >
              <Form.Item>
                <Checkbox>Additional Testing Required</Checkbox>
              </Form.Item>
              <Form.Item>
                <Checkbox>TAVR Workup Completed</Checkbox>
              </Form.Item>
              <Form.Item>
                <Checkbox>PowerPoint Reviewed</Checkbox>
              </Form.Item>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{marginTop: '5px', marginRight: '5px', width:'150px'}}>TAVR Appointment:</div>
                <Form.Item label="">
                <DatePicker
                      style={{ width: "100%" }}
                      format="DD/MM/YY"
                      defaultValue={patient?.tavrAppointment?.date ? formatDate(patient.tavrAppointment.date) : null}
                      onChange={(_, date) => updateDates("tavrAppointment", date)}
                    />
                </Form.Item>
              </div>
              <Form.Item>
              <Checkbox checked={!!patient?.tavrScheduled} onChange={(e) => {
                    handleProgressUpdate(6, e.target.checked ? "completed" : "pending");
                    updatePatientCheckboxes("tavrScheduled", e.target.checked)
                  }}>
                  TAVR Scheduled
                </Checkbox>
              </Form.Item>
            </Stage>
          </Form>
        </div>
        </Col>
        <Col span={7}>
          <SidePanel stages={stages} />
        </Col>
      </Row>

    </div>
  )
}

export default TAVRWorkflowForm

