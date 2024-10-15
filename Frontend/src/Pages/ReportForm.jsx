import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ReportForm = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfReport, setDateOfReport] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [medicines, setMedicines] = useState("");
  const [durationOfSymptoms, setDurationOfSymptoms] = useState("");
  const [severityOfSymptoms, setSeverityOfSymptoms] = useState("");
  const [previousDiagnoses, setPreviousDiagnoses] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [comments, setComments] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorfirstName, setDoctorFirstName] = useState("");
  const [doctorlastName, setDoctorLastName] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleFileChange = (e) => {
    setAttachments([...e.target.files]);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
      console.log("Fetched Doctors:", data.doctors);
    };
    fetchDoctors();
  }, []);

  const handleReport = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/report/sendreport",
        {
          firstname,
          lastname,
          email,
          gender,
          age,
          phone,
          dateOfReport,
          symptoms,
          medicines,
          durationOfSymptoms,
          severityOfSymptoms,
          previousDiagnoses,
          attachments,
          comments,
          department,
          doctor_firstName: doctorfirstName,
          doctor_lastName: doctorlastName,
          hasVisited: hasVisitedBool,
          hasVisitedBool,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // Reset the form fields after submission
      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setGender("");
      setPhone("");
      setAge("");
      setDateOfReport("");
      setSymptoms("");
      setMedicines("");
      setDurationOfSymptoms("");
      setSeverityOfSymptoms("");
      setPreviousDiagnoses("");
      setComments("");
      setDepartment("");
      setDoctorFirstName("");
      setDoctorLastName("");
      setHasVisited("");
      setAttachments([]);
      setHasVisited(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container form-component appointment-form">
      <h2>Report Form</h2>
      <form onSubmit={handleReport}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date of Report"
            value={dateOfReport}
            onChange={(e) => setDateOfReport(e.target.value)}
          />
          <input
            type="number"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
        <input type="number" 
          placeholder="Age"
          value={age}
          onChange={(e)=> setAge(e.target.value)}/>
          <input
            type="text"
            placeholder="Symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          <input
            type="text"
            placeholder="Medicines"
            value={medicines}
            onChange={(e) => setMedicines(e.target.value)}
          />
        </div>
        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select value={durationOfSymptoms} onChange={(e)=> setDurationOfSymptoms(e.target.value)}>
            <option value="">Select Duration of Symptoms</option>
            <option value="4 Days">4 Days</option>
            <option value="A week">A week</option>
            <option value="15 Days">15 Days</option>
            <option value="More than 15 Days">More than 15 Days</option>
          </select>
        </div>
        <div>
          <select
            value={severityOfSymptoms}
            onChange={(e) => setSeverityOfSymptoms(e.target.value)}
          >
            <option value="">Select Severity of Symptoms</option>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>
          <select
            value={previousDiagnoses}
            onChange={(e) => setPreviousDiagnoses(e.target.value)}
          >
            <option value="">Select Previous Diagnoses</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setDoctorFirstName("");
              setDoctorLastName("");
            }}
          >
            <option value="">Select Department</option>
            {departmentsArray.map((depart, index) => (
              <option value={depart} key={index}>
                {depart}
              </option>
            ))}
          </select>
          <select
            value={`${doctorfirstName} ${doctorlastName}`}
            onChange={(e) => {
              const [firstName, lastName] = e.target.value.split(" ");
              setDoctorFirstName(firstName);
              setDoctorLastName(lastName);
            }}
            disabled={!department}
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter((doctor) => doctor.doctorDepartment === department)
              .map((doctor, index) => (
                <option
                  value={`${doctor.firstname} ${doctor.lastname}`}
                  key={index}
                >
                  {doctor.firstname} {doctor.lastname}
                </option>
              ))}
          </select>
        </div>
        <div>
          <textarea
            rows="10"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Comments"
          />
        </div>
        <div>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <div className="visit-checkbox">
          <p style={{ marginBottom: 0 }}>Have you visited before?</p>
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
            style={{ width: "25px" }}
          />
        </div>
        <button type="submit" style={{ margin: "0 auto" }}>
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
