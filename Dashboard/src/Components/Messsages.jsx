import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(Context);
  const [expandedMessageId, setExpandedMessageId] = useState(null); // Track which message is expanded

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error.response.data.message);
        toast.error("Failed to fetch messages.");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  // Delete message function
  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/message/delete/${id}`, {
        withCredentials: true,
      });
      setMessages(messages.filter((message) => message._id !== id));
      toast.success("Message deleted successfully!");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error("Failed to delete message.");
    }
  };

  // Toggle expanded message
  const toggleExpand = (id) => {
    setExpandedMessageId(expandedMessageId === id ? null : id);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page messages">
      {loading ? (
        <div className="loading-container">
          <div className="loading-text">Loading Messages...</div>
        </div>
      ) : (
        <>
          <h1>Messages</h1>
          <div className="banner">
            {messages && messages.length > 0 ? (
              messages.map((element) => (
                <div
                  className={`card ${
                    expandedMessageId === element._id ? "expanded" : ""
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

                    {/* Show additional details only if expanded */}
                    {expandedMessageId === element._id && (
                      <>
                        <p>
                          Phone: <span>{element.phone}</span>
                        </p>
                        <p>
                          Message: <span>{element.message}</span>
                        </p>
                        <button
                          className="delete-button"
                          onClick={() => deleteMessage(element._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <h1>No Messages!</h1>
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

export default Messages;
