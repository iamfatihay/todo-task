import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import ShowGroups from "./ShowGroups";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const AddTask = ({ groups, setGroups, array, setArray, BASE_URL, setTasksInSelectedGroup, tasksInSelectedGroup, setShowAllTasks }) => {
  const [isContainerVisible, setContainerVisible] = useState(false);
  const [isGroupContainerVisible, setGroupContainerVisible] = useState(false);
  // const [isFilterContainerVisible, setFilterContainerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [task, setTask] = useState("");
  const [group, setGroup] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false); // New state

  const sendTask = (e) => {
    e.preventDefault();
    if (!selectedDate || task.trim() === "" || group === "") {
      return;
    }

    const newTask = {
      title: task,
      description: description,
      due_date: selectedDate.toISOString(), // Convert selectedDate to ISO format
      is_completed: false,
      is_deleted: false,
      group: group,
    };

    setSubmitting(true); // Set submitting to true before making the request

    axios
      .post(`${BASE_URL}/todo/`, newTask)
      .then((response) => {
        // Successfully sent
        console.log("Task sent successfully:", response.data);
        toastSuccessNotify("Task created successfully!");       
        // Add the newly created task to the array
        setArray([...array, response.data]);
      })
      .catch((error) => {
        // Handle the error condition here.
        console.error("Error sending the task:", error);
        toastErrorNotify("Check your inputs, may be too long!");
      })
      .finally(() => {
        setSubmitting(false); // Set submitting back to false after the request is completed
        setTask(""); // Clear task
        setDescription(""); // Clear description
        setSelectedDate(null); // Clear selectedDate
        setGroup(""); // Clear group
      });
  };

  const sendGroup = (e) => {
    e.preventDefault();

    if (group.trim() === "") {
      return;
    }
    
    const newTask = {
      name: group,
    };

    setSubmitting(true); // Set submitting to true before making the request

    axios
      .post(`${BASE_URL}/groups`, newTask)
      .then((response) => {
        // Successfully sent
        console.log("Group sent successfully:", response.data);
        // Add the newly created group to the array
        setGroups([...groups, response.data]);
        toastSuccessNotify("Group created successfully!");
      })
      .catch((error) => {
        // Handle the error condition here.
        console.error("Error sending the Group:", error);
        toastErrorNotify("Check your inputs, may be too long!");
      })
      .finally(() => {
        setSubmitting(false); // Set submitting back to false after the request is completed
        setGroup(""); // Clear the field
      });
  };

  const handleButtonClick = () => {
    setContainerVisible(!isContainerVisible);
  };

  const handleGroupButtonClick = () => {
    setGroupContainerVisible(!isGroupContainerVisible);
  };

  return (
    <div>
      <header className="header">
        <h1>TASK TRACKER</h1>
        <div className="header-btn">
          <ShowGroups groups={groups} setGroups={setGroups} array={array} setArray={setArray} BASE_URL={BASE_URL}
          tasksInSelectedGroup={tasksInSelectedGroup} setTasksInSelectedGroup={setTasksInSelectedGroup} setShowAllTasks={setShowAllTasks}/>
          <button className="btn btn-1" onClick={handleButtonClick}>
            Add Task
          </button>
          <button className="btn btn-2" onClick={handleGroupButtonClick}>
            Add Group
          </button>
        </div>
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
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="description"
              name="description"
              placeholder="Add Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={submitting} 
            />
          </div>
          <div className="form-control">
            <label htmlFor="day">Due Date</label>
            <DatePicker
              id="day"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              dateFormat="Pp"
              placeholderText="Add date"
            />
          </div>
          <div className="form-control">
            <label htmlFor="text">Group</label>
            <select
              className="select"
              id="text"
              name="text"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              placeholder="Select a group"
            >
              <option value="">Select a group</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className="btn btn-submit" type="submit">
              SUBMIT
            </button>
          </div>
        </form>
      )}
      {isGroupContainerVisible && (
        <form onSubmit={sendGroup}>
          <div className="form-control">
            <label htmlFor="text">New Group</label>
            <input
              id="text"
              type="text"
              name="text"
              placeholder="Add group"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              disabled={submitting} 
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
