import React, { useState} from "react";
import EditItemForm from "./EditItemForm";
// import { FaTimesCircle } from "react-icons/fa";
//!https://react-icons.github.io/react-icons


const ShowTasks = ({ group, array, setArray, BASE_URL }) => {
  const [editMode, setEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);

  const updateItem = async (id) => {
    try {
      // Find the item to update
      const itemToUpdate = array.find((item) => item.id === id);

      if (!itemToUpdate) {
        console.error("Item not found.");
        return;
      }

      // Toggle the is_completed value
      itemToUpdate.is_completed = !itemToUpdate.is_completed;

      // Send a PUT request using the API endpoint and the updated item
      const response = await fetch(`${BASE_URL}/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemToUpdate), // Include the entire item
      });

      if (!response.ok) {
        throw new Error("Update operation failed.");
      }

      // Updating data
      const updatedArray = array.map((item) => (item.id === id ? itemToUpdate : item));
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


  return (
    <div>
      {editMode ? (
        <EditItemForm
          item={array.find((item) => item.id === editingItemId)}
          onSave={updateItem}
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
                  {new Date(item.due_date).toLocaleString("tr-TR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

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
