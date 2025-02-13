"use client"

import { useState, useEffect, useRef } from "react"
import { Form, Input, Checkbox, DatePicker, Typography, Card, Row, Col, Steps, Radio } from "antd"
import { CheckCircleFilled, CalendarOutlined } from "@ant-design/icons"

const { Title, Text } = Typography
const { Step } = Steps

const DatePickerDemo = ({ value, onChange }) => (
  <DatePicker
    style={{ width: "100%" }}
    format="YYYY-MM-DD"
    value={value}
    onChange={onChange}
    suffixIcon={<CalendarOutlined />}
  />
)

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

const Stage = ({ title, children, status, innerRef }) => (
  <Card
    ref={innerRef}
    title={
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={4}>{title}</Title>
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

const TAVRWorkflowForm = ({ patient, updateProgress }) => {
  const [progress, setProgress] = useState({
    first: patient?.timeline?.progress?.first || "#d9d9d9",
    second: patient?.timeline?.progress?.second || "#d9d9d9",
    third: patient?.timeline?.progress?.third || "#d9d9d9",
    fourth: patient?.timeline?.progress?.fourth || "#d9d9d9",
    fifth: patient?.timeline?.progress?.fifth || "#d9d9d9",
    sixth: patient?.timeline?.progress?.sixth || "#d9d9d9",
    seventh: patient?.timeline?.progress?.seventh || "#d9d9d9",
  });
  console.log('ermal', patient.timeline)
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

  console.log("Bleron ermal", patient)
  const stageRefs = useRef(Array(7).fill(null))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stageIndex = Array.from(stageRefs.current).findIndex((ref) => ref === entry.target)
            if (stageIndex !== -1) {
              setStages((prevStages) =>
                prevStages.map((s, i) => (i === stageIndex ? { ...s, status: "inProgress" } : s)),
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
                  <DatePickerDemo />
                </Form.Item>
              </div>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{marginTop: '5px', marginRight: '5px', width:'170px'}}>Latest Echo:</div>
                <Form.Item label="">
                  <DatePickerDemo />
                </Form.Item>
              </div>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{marginTop: '5px', marginRight: '5px', width:'170px'}}>New Echo Appointment:</div>
                <Form.Item label="">
                  <DatePickerDemo />
                </Form.Item>
              </div>
              <Form.Item>
                <Checkbox onChange={(e) => handleProgressUpdate(0, e.target.checked ? "completed" : "inProgress")}>
                Echo Received By Provider
                </Checkbox>
              </Form.Item>
            </Stage>

            <Stage innerRef={stageRefs.current[1]} title="Stage 2 - Initial Consultation" status={stages[1].status}>
            <div style={{display: 'flex', flexDirection: 'row' , marginBottom: '10px'}}>
            <div>Consultation Appointment:</div>
            <Text style={{ display: 'block', marginLeft: '4px' }}>{patient.latestEcho?.date || '12/15/2025'}{' 10:30:00'}</Text>
            </div>
              {/* <Form.Item>
                <Checkbox>
                  KCCQ, Katz Index Scores and STS Scores
                </Checkbox>
              </Form.Item> */}
                <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px', marginTop: '20px'}}>
                  <div style={{ marginRight: '5px', width:'280px'}}>KCCQ, Katz Index Scores and STS Scores:</div>
                  <Radio.Group>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </Radio.Group>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
                  <Checkbox onChange={(e) => handleProgressUpdate(1, e.target.checked ? "completed" : "inProgress")}>
                    Can patient walk?
                  </Checkbox>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
                <div style={{ marginRight: '5px', width:'280px'}}>Pre-TAVR Walk Test Completed:</div>
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
                </div>
            </Stage>

            <Stage innerRef={stageRefs.current[2]} title="Stage 3 - CTS Consultation" status={stages[2].status}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{marginTop: '5px', marginRight: '5px', width:'170px'}}>CTS Consultation Date:</div>
                <Form.Item label="">
                  <DatePickerDemo />
                </Form.Item>
              </div>
              <div style={{marginTop: '5px', marginLeft: '25px'}}>
                <Checkbox onChange={(e) => handleProgressUpdate(2, e.target.checked ? "completed" : "inProgress")}>
                  Not needed
                </Checkbox>
              </div>
              </div>
              <Form.Item>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                <Checkbox onChange={(e) => handleProgressUpdate(2, e.target.checked ? "completed" : "inProgress")}>
                  CTS Consultation Completed
                </Checkbox>
                <div style={{marginLeft: '15px'}}>
                <Checkbox onChange={(e) => handleProgressUpdate(2, e.target.checked ? "completed" : "inProgress")}>
                  Not needed
                </Checkbox>
                </div>
                </div>
              </Form.Item>
            </Stage>

            <Stage innerRef={stageRefs.current[3]} title="Stage 4 - CT Scan" status={stages[3].status}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{marginTop: '5px', marginRight: '5px'}}>CT Scan Date:</div>
              <Form.Item label="">
                <DatePickerDemo />
              </Form.Item>
              </div>
              
              <Form.Item>
                <Checkbox>CT Scan Completed</Checkbox>
              </Form.Item>
              <Form.Item>
                <Checkbox onChange={(e) => handleProgressUpdate(3, e.target.checked ? "completed" : "inProgress")}>
                  CT Scan Uploaded
                </Checkbox>
              </Form.Item>
            </Stage>

              <Stage innerRef={stageRefs.current[4]} title="Stage 5 - Documentation" status={stages[4].status}>
                <Form.Item>
                  <Checkbox>Patient Info Worksheet Completed</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Checkbox onChange={(e) => handleProgressUpdate(4, e.target.checked ? "completed" : "inProgress")}>
                    PowerPoint Created
                  </Checkbox>
                </Form.Item>
              </Stage>

              <Stage innerRef={stageRefs.current[5]} title="Stage 6 - Review Process" status={stages[5].status}>
                <Form.Item>
                  <Checkbox>Device Rep Reviewed</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Checkbox onChange={(e) => handleProgressUpdate(5, e.target.checked ? "completed" : "inProgress")}>
                    Doctor Review Completed
                  </Checkbox>
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
                  <DatePickerDemo />
                </Form.Item>
              </div>
              <Form.Item>
                <Checkbox onChange={(e) => handleProgressUpdate(6, e.target.checked ? "completed" : "inProgress")}>
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

