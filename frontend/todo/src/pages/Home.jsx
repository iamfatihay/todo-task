import React, { useState, useEffect } from "react";
import AddTask from "../components/AddTask";
import ShowTasks from "../components/ShowTasks";

const Home = ({ BASE_URL }) => {
  const [array, setArray] = useState([]);

  //* Function to use to fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/todo/`); //* Specify API endpoint using BASE_URL
      if (!response.ok) {
        throw new Error("Could not retrieve data.");
      }
      const data = await response.json();
      setArray(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //* Fetch data when page loads
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <AddTask array={array} setArray={setArray} BASE_URL={BASE_URL}/>
      <ShowTasks array={array} setArray={setArray} BASE_URL={BASE_URL}/>
    </div>
  );
};

export default Home;
