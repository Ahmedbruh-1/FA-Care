import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorCount, setDoctorCount] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, admin } = useContext(Context);

  useEffect(() => {
    const fetchAppointmentsAndDoctors = async () => {
      setLoading(true);
      try {
        const appointmentsResponse = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        const doctorsResponse = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );

        console.log("Doctors Response:", doctorsResponse.data);

        setAppointments(appointmentsResponse.data.appointments);
        setTotalAppointments(appointmentsResponse.data.appointments.length);
        setDoctorCount(doctorsResponse.data.doctors.length);
      } catch (error) {
        console.error("Error fetching data:", error);
        setAppointments([]);
        setTotalAppointments(0);
        setDoctorCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointmentsAndDoctors();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/appointment/delete/${appointmentId}`,
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment._id !== appointmentId
        )
      );
      setTotalAppointments((prevTotal) => prevTotal - 1); // Update total appointments
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete appointment.");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        {loading ? (
          <div className="loading-container">
            <div className="loading-text">Loading...</div>
          </div>
        ) : (
          <>
            <div className="banner">
              <div className="firstBox">
                <img src="/doc.png" alt="docImg" />
                <div className="content">
                  <div>
                    <p>Hello </p>
                    <h5>
                      {admin
                        ? `${admin.firstname} ${admin.lastname}`
                        : "Admin Name Not Available"}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="secondBox">
                <p>Total Appointments</p>
                <h3>{totalAppointments}</h3>
              </div>
              <div className="thirdBox">
                <p>Registered Doctors</p>
                <h3>{doctorCount}</h3>
              </div>
            </div>
            <div className="banner">
              <h5>Appointments</h5>
              <table>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Visited</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments && appointments.length > 0
                    ? appointments.map((appointment) => (
                        <tr key={appointment._id}>
                          <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                          <td>{appointment.appointment_date.substring(0, 16)}</td>
                          <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                          <td>{appointment.department}</td>
                          <td>
                            <select
                              className={
                                appointment.status === "Pending"
                                  ? "value-pending"
                                  : appointment.status === "Accepted"
                                  ? "value-accepted"
                                  : "value-rejected"
                              }
                              value={appointment.status}
                              onChange={(e) =>
                                handleUpdateStatus(
                                  appointment._id,
                                  e.target.value
                                )
                              }
                            >
                              <option value="Pending" className="value-pending">
                                Pending
                              </option>
                              <option value="Accepted" className="value-accepted">
                                Accepted
                              </option>
                              <option value="Rejected" className="value-rejected">
                                Rejected
                              </option>
                            </select>
                          </td>
                          <td>
                            {appointment.hasVisited === true ? (
                              <GoCheckCircleFill className="green" />
                            ) : (
                              <AiFillCloseCircle className="red" />
                            )}
                          </td>
                          <td>
                            <button
                              onClick={() => deleteAppointment(appointment._id)}
                              className="delete-button"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))
                    : "No Appointments Found!"}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      <style jsx>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f8f9fa;
        }

        .loading-text {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          padding: 20px;
          background-color: #fff;
          border: 2px solid #ddd;
          border-radius: 8px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }

        .dashboard.page {
          padding: 20px;
        }

        .delete-button {
          background-color: transparent;
          border: none;
          cursor: pointer;
          color: #ff4d4d;
        }

        .delete-button:hover {
          color: #d93025;
        }
      `}</style>
    </>
  );
};

export default Dashboard;
