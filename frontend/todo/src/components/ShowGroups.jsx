import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { toastSuccessNotify } from "../helper/ToastNotify";

const ShowGroups = ({ groups, setGroups, array, setArray, BASE_URL, tasksInSelectedGroup, setTasksInSelectedGroup, setShowAllTasks }) => {
  const [isGroupVisible, setGroupVisible] = useState(false);
  

  const handleDeleteGroup = (groupId) => {
    axios
      .delete(`${BASE_URL}/groups/${groupId}`)
      .then((response) => {
        console.log(`Group ${groupId} deleted successfully.`);
        toastSuccessNotify("Group deleted successfully!");
        // Set group info to null when group is deleted
        const updatedTasks = array.map((task) => {
          if (task.group === groupId) {
            return { ...task, group: null };
          }
          return task;
        });
        setArray(updatedTasks);

        // Once the deletion is complete, remove it from the local group list
        const updatedGroups = groups.filter((group) => group.id !== groupId);
        setGroups(updatedGroups);
      })
      .catch((error) => {
        console.error('Error deleting the group:', error);
      });
  };

  const handleGroupClick = (groupId) => {
    // Here you can filter and show the tasks in that group using the selected group ID.
    const tasksInSelectedGroup = array.filter((task) => task.group === groupId);
    // You can view the resulting tasks by storing them with a status.
    setTasksInSelectedGroup(tasksInSelectedGroup);
    setShowAllTasks(false);
  };

  useEffect(() => {
    if (isGroupVisible) {
      axios
        .get(`${BASE_URL}/groups`)
        .then((response) => {
          setGroups(response.data);
        })
        .catch((error) => {
          console.error('Error fetching groups:', error);
        });
    }
  }, [isGroupVisible, BASE_URL, setGroups]);

  

  return (
    <div>
      <button className="btn" onClick={() => setGroupVisible(!isGroupVisible)}>
        {isGroupVisible ? 'Hide Groups' : 'Show Groups'}
      </button>

      {isGroupVisible && (
        <div>
          {groups.map((group) => (
            <div className='group' key={group.id}>
              <p onClick={() => handleGroupClick(group.id)}>{group.name}</p>
              <button
                className='icons'
                onClick={() => {
                  handleDeleteGroup(group.id);
                  // Once the deletion is complete, remove it from the local group list
                  const updatedGroups = groups.filter((g) => g.id !== group.id);
                  setGroups(updatedGroups);
                }}
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowGroups;
