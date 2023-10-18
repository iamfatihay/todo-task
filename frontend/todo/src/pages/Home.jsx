import React, { useState, useEffect } from "react";
import GorevEkle from "../components/GorevEkle";
import GorevleriGoster from "../components/GorevleriGoster";

const Home = ({ baseUrl }) => {
  const [array, setArray] = useState([]);

  // Verileri API'den çekmek için kullanılacak fonksiyon
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/todo`); // BASE_URL'i kullanarak API endpoint'ini belirtin
      if (!response.ok) {
        throw new Error("Veriler alınamadı.");
      }
      const data = await response.json();
      setArray(data);
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  // Sayfa yüklendiğinde verileri çek
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <GorevEkle array={array} setArray={setArray} baseUrl={baseUrl}/>
      <GorevleriGoster array={array} setArray={setArray} baseUrl={baseUrl}/>
    </div>
  );
};

export default Home;
