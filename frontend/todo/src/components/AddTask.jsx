import axios from 'axios';
import { useState } from "react";

const AddTask = ({ array, setArray, BASE_URL }) => {

  const [isContainerVisible, setContainerVisible] = useState(false);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");

  const sendTask = (e) => {
    e.preventDefault();
    if (date.trim() === '' && task.trim() === '') {
      return;
    }

    const formattedDate = new Date(date).toISOString().split('T')[0];

    const newTask = {
      "title": task, // Corresponds to the "title" field in the ToDoItem model
      "description": "", // You can add an optional description here if you have one
      "due_date": formattedDate, // Corresponds to the "due_date" field in the ToDoItem model
      "is_completed": false, // "is_completed" will be set to "false" by default when creating a new task
      "is_deleted": false, // "is_deleted" will be set to "false" by default when creating a new task
      "group": null, // You can assign a group by adding the group's ID here
    };

    axios.post(`${BASE_URL}/todo/`, newTask)
      .then(response => {
        // Successfully sent
        console.log('Task sent successfully:', response.data);
        // You can process the data returned from the backend here if needed.
      })
      .catch(error => {
        // Handle the error condition here.
        console.error('Error sending the task:', error);
      });

    setTask("");
    setDate("");
  };

  const handleButtonClick = () => {
    setContainerVisible(!isContainerVisible);
  };



  return (
    <div>
      <header className="header">
        <h1>TASK TRACKER</h1>
        <button
          className="btn"
          onClick={handleButtonClick}
        >
          ADD TASK BAR
        </button>
      </header>
      {isContainerVisible && <form onSubmit={sendTask} >
        <div className="form-control">
          <label htmlFor="text">Task</label>
          <input
            id="text"
            type="text"
            name="text"
            placeholder="Add Task"
            onChange={(e) => setTask(e.target.value)}

          />
        </div>
        <div className="form-control">
          <label htmlFor="day">Day & Time</label>
          <input
            id="day"
            type="text"
            name="day"
            placeholder="Add date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <button className="btn btn-submit" type="submit">
            SUBMİT
          </button>
        </div>
      </form>}

    </div>
  );
};

export default AddTask;
