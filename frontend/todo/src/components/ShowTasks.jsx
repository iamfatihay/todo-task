import React from "react";
import { FaTimesCircle } from "react-icons/fa";
//!https://react-icons.github.io/react-icons
const ShowTasks = ({ array, setArray, BASE_URL }) => {
  // console.log(array);

  const updateItem = async (id) => {
    try {
      // API endpoint'ini ve güncellenecek öğenin ID'sini kullanarak PATCH isteği gönderin
      const response = await fetch(`${BASE_URL}/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_completed: !array.find((gorev) => gorev.id === id).is_completed }),
      });

      if (!response.ok) {
        throw new Error("Update operation failed.");
      }

      // Veriyi güncelleme
      const updatedArray = array.map((gorev) => {
        if (gorev.id === id) {
          return { ...gorev, is_completed: !gorev.is_completed };
        }
        return gorev;
      });

      setArray(updatedArray);
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const Delete = (id) => {
    const updatedArray = array.filter(gorev => gorev.id !== id);
    setArray(updatedArray);
  };


  return (
    <div>
      {array.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No Task to show, good job!</p>
      ) : (
        array.map((x) => (
          <div
            key={x.id}
            className={`${x.is_completed ? "done" : "gorev"}`}
            onDoubleClick={() => updateItem(x.id)}
          >
            <h3>
              {x.title}
              <FaTimesCircle
                style={{ color: "red" }}
                onClick={() => Delete(x.id)}
              />
            </h3>
            <h6>{x.day}</h6>
          </div>
        ))
      )}
    </div>
  );
};

export default ShowTasks;
