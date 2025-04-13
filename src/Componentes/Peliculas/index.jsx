import React, { useState, useEffect } from 'react';
import './style.css'; // Asegúrate de tener este archivo

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ghibliapi.vercel.app/films')
      .then((response) => response.json())
      .then((data) => {
        setPeliculas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Cargando películas...</div>;
  }

  return (
    <div className="peliculas-container">
      <h1>Películas de Studio Ghibli</h1>
      <div className="peliculas-grid">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="pelicula-card">
            <h3>{pelicula.title}</h3>
            <p>Director: {pelicula.director}</p>
            <p>Año: {pelicula.release_date}</p>
            <p>⭐ {pelicula.rt_score}/100</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Peliculas;