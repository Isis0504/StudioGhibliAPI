import React, { useState, useEffect } from 'react';
import './style.css'; // Asegúrate de tener este archivo CSS en la carpeta

const Personajes = () => {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ghibliapi.vercel.app/people')
      .then((response) => response.json())
      .then((data) => {
        setPersonajes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Cargando personajes...</div>;

  return (
    <div className="personajes-container">
      <h1>Personajes de Studio Ghibli</h1>
      <div className="personajes-grid">
        {personajes.map((personaje) => (
          <div key={personaje.id} className="personaje-card">
            <h3>{personaje.name}</h3>
            <p><strong>Género:</strong> {personaje.gender || 'Desconocido'}</p>
            <p><strong>Edad:</strong> {personaje.age || '?'}</p>
            {/* Nota: La API a veces devuelve 'species' como URL, no como texto */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Personajes;