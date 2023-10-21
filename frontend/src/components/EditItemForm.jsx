import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdSaveAs, MdCancel } from "react-icons/md";
import { toastSuccessNotify } from "../helper/ToastNotify";

const EditItemForm = ({ item, onSave, onCancel }) => {
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedDescription, setEditedDescription] = useState(item.description);
  const [editedDueDate, setEditedDueDate] = useState(new Date());

  const handleSave = () => {
    // You can make edits here and send updated data to the API
    const editedItem = {
      id: item.id,
      title: editedTitle,
      description: editedDescription,
      due_date: editedDueDate,
      is_completed: item.is_completed,
      is_deleted: item.is_deleted,
      group: item.group,
      group_name: item.group_name,
    };
    
    onSave(editedItem) // Send update request to API
    toastSuccessNotify("Saved successfully!");
    onCancel(); // Close the edit bar

  };

  return (
    <div>
      <div className="form-control">
        <label htmlFor="title">Task</label>
        <input
          type="text"
          id="title"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="day">Day & Time</label>
        <DatePicker
          id="day"
          selected={editedDueDate}
          onChange={(date) => setEditedDueDate(date)}
          showTimeSelect
          dateFormat="Pp"
          placeholderText="Change date"
        />
      </div>
      <div className="buttons">
        <button className="icons edit" onClick={handleSave}><MdSaveAs /></button>
        <button className="icons edit" onClick={onCancel}><MdCancel /></button>
      </div>
    </div>
  );
};

export default EditItemForm;
