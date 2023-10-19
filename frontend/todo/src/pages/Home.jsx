import React, { useState, useEffect } from "react";
import AddTask from "../components/AddTask";
import ShowTasks from "../components/ShowTasks";


const Home = ({ BASE_URL }) => {
  const [array, setArray] = useState([]);
  const [group, setGroup] = useState([]);

  // Function to use to fetch tasks from API
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/todo/`); // Specify API endpoint using BASE_URL
      if (!response.ok) {
        throw new Error("Could not retrieve data.");
      }
      const data = await response.json();
      setArray(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await fetch(`${BASE_URL}/groups`); // Specify API endpoint using BASE_URL
      if (!response.ok) {
        throw new Error("Could not retrieve data.");
      }
      const data = await response.json();
      setGroup(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //* Fetch data when page loads
  useEffect(() => {
    fetchTasks();
    fetchGroups();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <AddTask array={array} setArray={setArray} BASE_URL={BASE_URL}/>
      <ShowTasks group={group} array={array} setArray={setArray} BASE_URL={BASE_URL}/>
    </div>
  );
};

export default Home;
