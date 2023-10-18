import { useState } from "react";

const AddTask = ({array,setArray}) => {
 
    const [isContainerVisible, setContainerVisible] = useState(false);
    const[task,setTask]=useState("");
    const[date,setDate]=useState("");

    const gonder = (e) => {
      e.preventDefault()
      if (date.trim() === '' && task.trim() === '') {
        return;
      }
  
      const newTask = {
        id: Date.now(),
        text: task,
        day: date,
        bitti: false,
      };
  
      setArray([...array, newTask]);
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
      {isContainerVisible && <form onSubmit={gonder} >
          <div className="form-control">
            <label htmlFor="text">Task</label>
            <input
              id="text"
              type="text"
              name="text"
              placeholder="Add Task"
              onChange={(e)=>setTask(e.target.value)}
             
            />
          </div>
          <div className="form-control">
            <label htmlFor="day">Day & Time</label>
            <input
              id="day"
              type="text"
              name="day"
              placeholder="Add date"
              onChange={(e)=>setDate(e.target.value)}
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
