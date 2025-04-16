import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styleDe.css';

const Detalle = () => {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [loading, setLoading] = useState(true);
  const [esFavorita, setEsFavorita] = useState(false);

  useEffect(() => {
    fetch(`https://ghibliapi.dev/films/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Película no encontrada");
        return response.json();
      })
      .then((data) => {
        setPelicula(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching detalles:", error);
        setLoading(false);
      });
  }, [id]);

  const toggleFavorita = () => {
    setEsFavorita(!esFavorita);
  };

  if (loading) return <div className="loading">Cargando detalles...</div>;
  if (!pelicula) return <div className="error">No se encontró la película</div>;

  return (
    <div className="detalle-container">
      <img 
        src={pelicula.image} 
        alt={pelicula.title} 
        className="detalle-poster"
      />

      <div className="detalle-info">
        <h1>{pelicula.title}</h1>
        <p><strong>Título original:</strong> {pelicula.original_title}</p>
        <p><strong>Director:</strong> {pelicula.director}</p>
        <p><strong>Año:</strong> {pelicula.release_date}</p>
        <p><strong>Puntuación:</strong> ⭐ {pelicula.rt_score}/100</p>
        <p><strong>Descripción:</strong> {pelicula.description}</p>

        <div className="detalle-botones">
          <Link to="/peliculas" className="btn-volver">← Volver</Link>
          <button onClick={toggleFavorita} className="btn-favorito-solo-icono">
            {esFavorita ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detalle;
