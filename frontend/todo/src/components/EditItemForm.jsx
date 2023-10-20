import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdSaveAs, MdCancel } from "react-icons/md";

const EditItemForm = ({ item, onSave, onCancel }) => {
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedDescription, setEditedDescription] = useState(item.description);
  const [editedDueDate, setEditedDueDate] = useState(new Date());

  const handleSave = () => {
    // Düzenleme işlemlerini burada yapabilir ve güncel veriyi API'ye gönderebilirsiniz
    const editedItem = {
      id: item.id,
      title: editedTitle,
      description: editedDescription,
      due_date: editedDueDate,
      is_completed: item.is_completed,
      is_deleted: item.is_deleted,
      group: item.group,
    };

    onSave(editedItem); // API'ye güncelleme isteği gönder
  };

  return (
    <div>
      <div className="form-control">
        <label htmlFor="text">Task</label>
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <label htmlFor="text">Description</label>
        <input
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
        <button className="icons edit" onClick={handleSave}><MdSaveAs/></button>
        <button className="icons edit" onClick={onCancel}><MdCancel/></button>
      </div>
    </div>
  );
};

export default EditItemForm;
