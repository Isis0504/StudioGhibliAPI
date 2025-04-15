import React, { useState, useEffect } from "react";
import ghibliLocations from "../../Data/locations.json";
import "./styleL.css";

const Locaciones = () => {
  const [locaciones, setLocaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Traemos datos del API
    const fetchLocations = async () => {
      try {
        const response = await fetch("https://ghibliapi.vercel.app/locations");
        const data = await response.json();

        // Combinamos imágenes del JSON con datos del API
        const dataConImagenes = data.map((item) => {
          const imagen = ghibliLocations.find(
            (loc) => loc.name.toLowerCase() === item.name.toLowerCase()
          );
          return {
            ...item,
            image: imagen ? imagen.image : null,
          };
        });

        setLocaciones(dataConImagenes);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener locaciones:", error);
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) return <div className="loading">Cargando locaciones...</div>;

  return (
    <div className="locaciones-container">
      <h1>Locaciones de Studio Ghibli</h1>
      <div className="locaciones-grid">
        {locaciones.map((locacion, index) => (
          <div key={index} className="locacion-card">
            <img
              src={
                locacion.image ||
                `https://via.placeholder.com/300x200/cccccc/333333?text=${encodeURIComponent(
                  locacion.name
                    .split(" ")
                    .map((w) => w[0].toUpperCase())
                    .join("")
                )}`
              }
              alt={locacion.name}
              className="locacion-img"
            />
            <div className="locacion-info">
              <h3>{locacion.name}</h3>
              <p className="climate-text">
                Clima: {locacion.climate || "No especificado"}
              </p>
              {/* Puedes agregar más detalles si quieres */}
              {/* <p>Terreno: {locacion.terrain}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locaciones;
