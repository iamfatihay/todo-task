import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const AddTask = ({ array, setArray, BASE_URL }) => {
  const [isContainerVisible, setContainerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [task, setTask] = useState("");
  const [submitting, setSubmitting] = useState(false); // New state

  const sendTask = (e) => {
    e.preventDefault();
    if (!selectedDate || task.trim() === "") {
      return;
    }

    const formattedDueDate = selectedDate.toISOString().split("T")[0]; // Format the date
    const newTask = {
      title: task,
      due_date: formattedDueDate,
      is_completed: false,
      is_deleted: false,
      group: null,
    };

    setSubmitting(true); // Set submitting to true before making the request

    axios
      .post(`${BASE_URL}/todo/`, newTask)
      .then((response) => {
        // Successfully sent
        console.log("Task sent successfully:", response.data);
        // Add the newly created task to the array
        setArray([...array, response.data]);
      })
      .catch((error) => {
        // Handle the error condition here.
        console.error("Error sending the task:", error);
      })
      .finally(() => {
        setSubmitting(false); // Set submitting back to false after the request is completed
        setTask(""); // Clear task
        setSelectedDate(null); // Clear selectedDate
      });
  };

  const handleButtonClick = () => {
    setContainerVisible(!isContainerVisible);
  };

  return (
    <div>
      <header className="header">
        <h1>TASK TRACKER</h1>
        <button className="btn" onClick={handleButtonClick}>
          ADD TASK BAR
        </button>
      </header>
      {isContainerVisible && (
        <form onSubmit={sendTask}>
          <div className="form-control">
            <label htmlFor="text">Task</label>
            <input
              id="text"
              type="text"
              name="text"
              placeholder="Add Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              disabled={submitting} // Disable the input while submitting
            />
          </div>
          <div className="form-control">
            <label htmlFor="day">Day & Time</label>
            <DatePicker
              id="day"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              dateFormat="Pp"
              placeholderText="Add date"
            />
          </div>
          <div>
            <button className="btn btn-submit" type="submit">
              SUBMIT
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTask;
