import React, { useState } from 'react';
import axios from 'axios';

const ShowGroups = ({ groups, setGroups, BASE_URL }) => {
  const [isGroupVisible, setGroupVisible] = useState(false);

  const handleDeleteGroup = (groupId) => {
    // Silme isteği gönder
    axios
      .delete(`${BASE_URL}/groups/${groupId}`)
      .then((response) => {
        // Başarıyla silindi
        console.log(`Group ${groupId} deleted successfully.`);
        // Silinen grubu yerel gruplar listesinden kaldır
        
      })
      .catch((error) => {
        // Hata durumunu ele al
        console.error('Error deleting the group:', error);
      })
      .finally(() => {
        const updatedGroups = groups.filter((group) => group.id !== groupId);
        setGroups(updatedGroups);
      });
  };

  return (
    <div>
      <button className="btn" onClick={() => setGroupVisible(!isGroupVisible)}>
        {isGroupVisible ? 'Hide Groups' : 'Show Groups'}
      </button>

      {isGroupVisible && (
        <div>
          {groups.map((group) => (
            <div key={group.id}>
              {group.name}
              <button onClick={() => handleDeleteGroup(group.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowGroups;
