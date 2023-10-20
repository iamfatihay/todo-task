import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";

const ShowGroups = ({ groups, setGroups, BASE_URL }) => {
    const [isGroupVisible, setGroupVisible] = useState(false);

    const handleDeleteGroup = (groupId) => {
        axios
            .delete(`${BASE_URL}/groups/${groupId}`)
            .then((response) => {
                console.log(`Group ${groupId} deleted successfully.`);
                // Silinen grubu yerel gruplar listesinden kaldırın
                const updatedGroups = groups.filter((group) => group.id !== groupId);
                setGroups(updatedGroups);
            })
            .catch((error) => {
                console.error('Error deleting the group:', error);
            });
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
                <div >
                    {groups.map((group) => (
                        <div className='group' key={group.id}>
                            <p>{group.name}</p> 
                            <button className='icons' onClick={() => handleDeleteGroup(group.id)}><MdDelete/></button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowGroups;
