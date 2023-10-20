import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { toastSuccessNotify } from "../helper/ToastNotify";

const ShowGroups = ({ groups, setGroups, array, setArray, BASE_URL }) => {
  const [isGroupVisible, setGroupVisible] = useState(false);
  const [isGroupsTasksVisible, setGroupsTasksVisible] = useState(false);
  const [tasksInSelectedGroup, setTasksInSelectedGroup] = useState([]);

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
    // Burada seçilen grup ID'sini kullanarak o gruptaki görevleri filtreleyebilir ve gösterebilirsiniz.
    const tasksInSelectedGroup = array.filter((task) => task.group === groupId);
    // Elde edilen görevleri bir durumla saklayarak görüntüleyebilirsiniz.
    setTasksInSelectedGroup(tasksInSelectedGroup);
    handleButtonClick()
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

  const handleButtonClick = () => {
    setGroupsTasksVisible(!isGroupsTasksVisible);
  };

  return (
    <div>
      <button className="btn" onClick={() => setGroupVisible(!isGroupVisible)}>
        {isGroupVisible ? 'Hide Groups' : 'Show Groups'}
      </button>


      {isGroupVisible && (
        <div>
          {groups.map((group) => (
            <div className='group' key={group.id} onClick={() => handleGroupClick(group.id)} >
              <p>{group.name}</p>
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
          {isGroupsTasksVisible && tasksInSelectedGroup.map((task) => (
            <div key={task.id}>
              <p className='tasks-group'>{task.title}</p>
              <p className='tasks-group-date'>
                  Due Date :{" "}
                  {new Date(task.due_date).toLocaleString("de-DE", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowGroups;
