import { useState } from "react";

const EditItemForm = ({ item, onSave, onCancel }) => {
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedDescription, setEditedDescription] = useState(item.description);

  const handleSave = () => {
    // Düzenleme işlemlerini burada yapabilir ve güncel veriyi API'ye gönderebilirsiniz
    const editedItem = {
      id: item.id,
      title: editedTitle,
      description: editedDescription,
      // Diğer alanlar
    };

    onSave(editedItem); // API'ye güncelleme isteği gönder
  };

  return (
    <div>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      />
      <button onClick={handleSave}>Kaydet</button>
      <button onClick={onCancel}>İptal</button>
    </div>
  );
};

export default EditItemForm;
