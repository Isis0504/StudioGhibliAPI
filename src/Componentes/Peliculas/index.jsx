import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ghibliapi.dev/films')
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

  if (loading) return <div className="loading">Cargando películas...</div>;

  return (
    <div className="peliculas-container">
      <h1>Películas de Studio Ghibli</h1>
      <div className="peliculas-grid">
        {peliculas.map((pelicula) => (
          <Link 
            to={`/peliculas/${pelicula.id}`} 
            key={pelicula.id} 
            className="pelicula-card"
          >
            <img
              src={pelicula.image} // Usa la imagen directa de la API
              alt={pelicula.title}
              onError={(e) => { 
                e.target.src = 'https://via.placeholder.com/300x400?text=Poster+no+disponible';
              }}
            />
            <h3>{pelicula.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Peliculas;