import React, { useState} from "react";
import EditItemForm from "./EditItemForm";
// import { FaTimesCircle } from "react-icons/fa";
//!https://react-icons.github.io/react-icons


const ShowTasks = ({ groups, setGroups, array, setArray, BASE_URL }) => {
  const [editMode, setEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);

  const updateItem = async (id, editedItem) => {
    try {
      // Send a PUT request using the API endpoint and the updated item
      const response = await fetch(`${BASE_URL}/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedItem), // Use the editedItem
      });
  
      if (!response.ok) {
        throw new Error("Update operation failed.");
      }
  
      // Updating data
      const updatedArray = array.map((item) => (item.id === id ? editedItem : item));
      setArray(updatedArray);
      // After updating, close the edit mode
      setEditMode(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const MarkAsDeleted = async (id) => {
    try {
      // Send a DELETE request using the API endpoint and the ID of the item to be marked as deleted
      const response = await fetch(`${BASE_URL}/todo/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Mark as deleted operation failed.");
      }

      // Remove the item from the array
      const updatedArray = array.filter((item) => item.id !== id);
      setArray(updatedArray);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editItem = (id) => {
    // Open the edit mode and store the editing item's ID
    setEditMode(true);
    setEditingItemId(id);
  };

  const handleEditItem = (editedItem) => {
    updateItem(editingItemId, editedItem);
  };

  return (
    <div>
      {editMode ? (
        <EditItemForm
          item={array.find((item) => item.id === editingItemId)}
          onSave={handleEditItem}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <div>
          {array.length === 0 ? (
            <p style={{ textAlign: "center" }}>No Task to show, good job!</p>
          ) : (
            array.map((item) => (
              <div key={item.id} className={` ${item.is_completed ? "done" : "not-yet"}`}>
                <h3>{item.title}</h3>

                {item.description && <p>{item.description}</p>}
                <p>
                  Due Date:{" "}
                  {new Date(item.due_date).toLocaleString("de-DE", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>Group: {item.group_name}</p>

                <div className="buttons">
                  <button onClick={() => updateItem(item.id)}>
                    {item.is_completed ? "Mark as Undone" : "Mark as Done"}
                  </button>
                  <button onClick={() => editItem(item.id)}>Düzenle</button>

                  <button onClick={() => MarkAsDeleted(item.id)} className="delete-button">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ShowTasks;
