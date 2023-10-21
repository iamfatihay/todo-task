import React, { useState, useEffect } from "react";
import AddTask from "../components/AddTask";
import ShowTasks from "../components/ShowTasks";


const Home = ({ BASE_URL }) => {
  const [array, setArray] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tasksInSelectedGroup, setTasksInSelectedGroup] = useState([]);
  const [showAllTasks, setShowAllTasks] = useState(true);

  // Function to use to fetch tasks from API
  const fetchData = async (url, stateUpdater, errorMessage) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(errorMessage);
      }
      const data = await response.json();
      stateUpdater(data);
    } catch (error) {
      console.error(`Error: ${errorMessage}`, error);
      // Show error notification to user
    }
  };

  useEffect(() => {
    fetchData(`${BASE_URL}/todo/`, setArray, "Could not retrieve tasks.");
  }, [BASE_URL]);

  useEffect(() => {
    fetchData(`${BASE_URL}/groups`, setGroups, "Could not retrieve groups.");
  }, [BASE_URL]);

  return (
    <div>
      <AddTask groups={groups} setGroups={setGroups} array={array} setArray={setArray} BASE_URL={BASE_URL} tasksInSelectedGroup={tasksInSelectedGroup}
        setTasksInSelectedGroup={setTasksInSelectedGroup} setShowAllTasks={setShowAllTasks} />
      <ShowTasks groups={groups} setGroups={setGroups} array={array} setArray={setArray} BASE_URL={BASE_URL} tasksInSelectedGroup={tasksInSelectedGroup}
        setTasksInSelectedGroup={setTasksInSelectedGroup} setShowAllTasks={setShowAllTasks} showAllTasks={showAllTasks}
      />
    </div>
  );
};

export default Home;
