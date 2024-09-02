import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/user/doctors/${id}`, {
        withCredentials: true,
      });
      setDoctors(doctors.filter((doctor) => doctor._id !== id));
      toast.success("Doctor deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete doctor.");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page doctors">
      {loading ? (
        <div className="loading-container">
          <div className="loading-text">Loading Doctors...</div>
        </div>
      ) : (
        <>
          <h1>DOCTORS</h1>
          <div className="banner">
            {doctors && doctors.length > 0 ? (
              doctors.map((element, index) => {
                return (
                  <div className="card" key={index}>
                    <img
                      src={element?.docAvatar?.url || ""}
                      alt="doctor avatar"
                    />
                    <h4>{`${element.firstname} ${element.lastname}`}</h4>
                    <div className="details">
                      <p>
                        Email: <span>{element.email}</span>
                      </p>
                      <p>
                        Phone: <span>{element.phone}</span>
                      </p>
                      <p>
                        DOB: <span>{element.dob.substring(0, 10)}</span>
                      </p>
                      <p>
                        Department: <span>{element.doctorDepartment}</span>
                      </p>
                      <p>
                        NIC: <span>{element.cnic}</span>
                      </p>
                      <p>
                        Gender: <span>{element.gender}</span>
                      </p>
                    </div>
                    <button
                      className="delete-button"
                      onClick={() => deleteDoctor(element._id)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })
            ) : (
              <h1>No Registered Doctors Found!</h1>
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

        .page.doctors {
          padding: 20px;
        }

        .card {
          position: relative;
          border: 1px solid #ddd;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 8px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }

        .delete-button {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 8px 12px;
          background-color: #ff4d4d;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background-color 0.3s;
        }

        .delete-button:hover {
          background-color: #e60000;
        }
      `}</style>
    </section>
  );
};

export default Doctors;
