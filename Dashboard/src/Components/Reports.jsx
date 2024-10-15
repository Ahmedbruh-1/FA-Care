import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(Context);
  const [expandedReportId, setExpandedReportId] = useState(null); // State for expanded report

  // Toggle report expansion
  const toggleExpand = (id) => {
    setExpandedReportId(expandedReportId === id ? null : id);
  };

  // Fetching reports
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/report/getreports",
          { withCredentials: true }
        );
        setReports(data.reports);
      } catch (error) {
        console.log(error.response.data.message);
        toast.error("Failed to fetch Reports.");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // Fetching doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        console.log(error.response.data.message);
        toast.error("Failed to fetch Doctors.");
      }
    };
    fetchDoctors();
  }, []);

  // Delete report function
  const deleteReport = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/report/deletereport/${id}`,
        {
          withCredentials: true,
        }
      );
      setReports(reports.filter((report) => report._id !== id));
      toast.success("Report deleted successfully!");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error("Failed to delete report.");
    }
  };

  // Authentication check
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page messages">
      {loading ? (
        <div className="loading-container">
          <div className="loading-text">Loading Reports...</div>
        </div>
      ) : (
        <>
          <h1>Reports</h1>
          <div className="banner">
            {reports && reports.length > 0 ? (
              reports.map((element) => (
                <div
                  className={`card ${
                    expandedReportId === element._id ? "expanded" : ""
                  }`}
                  key={element._id}
                  onClick={() => toggleExpand(element._id)}
                >
                  <div className="details">
                    <p>
                      First Name: <span>{element.firstname}</span>
                    </p>
                    <p>
                      Last Name: <span>{element.lastname}</span>
                    </p>
                    <p>
                      Email: <span>{element.email}</span>
                    </p>

                    {/* Only show more details if the report is expanded */}
                    {expandedReportId === element._id && (
                      <>
                        <p>
                          Phone: <span>{element.phone}</span>
                        </p>
                        <p>
                          Gender: <span>{element.gender}</span>
                        </p>
                        <p>
                          Age: <span>{element.age}</span>
                        </p>
                        <p>
                          dateOfReport: <span>{element.dateOfReport}</span>
                        </p>
                        <p>
                          symptoms: <span>{element.symptoms}</span>
                        </p>
                        <p>
                          medicines: <span>{element.medicines}</span>
                        </p>
                        <p>
                          durationOfSymptoms:{" "}
                          <span>{element.durationOfSymptoms}</span>
                        </p>
                        <p>
                          severityOfSymptoms:{" "}
                          <span>{element.severityOfSymptoms}</span>
                        </p>
                        <p>
                          previousDiagnoses:{" "}
                          <span>{element.previousDiagnoses}</span>
                        </p>
                        <p>
                          department: <span>{element.department}</span>
                        </p>
                        <p>
                          Doctor:{" "}
                          <span>{`${element.doctor?.firstName || "N/A"} ${
                            element.doctor?.lastName || ""
                          }`}</span>
                        </p>
                        <p>
                          comments: <span>{element.comments}</span>
                        </p>
                        <button
                          className="delete-button"
                          onClick={() => deleteReport(element._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <h1>No Reports</h1>
            )}
          </div>
        </>
      )}

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

        .page.messages {
          padding: 20px;
        }

        .card {
          position: relative;
          border: 1px solid #ddd;
          padding: 10px;
          margin-bottom: 15px;
          border-radius: 8px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          overflow: hidden;
          cursor: pointer;
        }

        .card:hover {
          box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
        }

        .card.expanded {
          padding: 20px;
          max-height: none;
        }

        .card:not(.expanded) {
          max-height: 120px;
          overflow: hidden;
          padding: 10px;
        }

        .delete-button {
          padding: 8px 12px;
          background-color: #ff4d4d;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background-color 0.3s;
          margin-top: 10px;
        }

        .delete-button:hover {
          background-color: #e60000;
        }

        .details span {
          font-weight: bold;
        }
      `}</style>
    </section>
  );
};

export default Reports;
