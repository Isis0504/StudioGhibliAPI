import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../../Contexto/contexto';
import './styleDe.css';

const Detalle = () => {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [loading, setLoading] = useState(true);
  const { favoritos, toggleFavorito } = useContext(AppContext);
  
  const esFavorita = favoritos.peliculas?.some(fav => fav.id === pelicula?.id) || false;

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

  if (loading) return <div className="loading">Cargando...</div>;
  if (!pelicula) return <div className="error">Película no encontrada</div>;

  return (
    <div className="detalle-container">
      <div className="detalle-poster">
        <img 
          src={pelicula.image} 
          alt={pelicula.title}
          className="detalle-img"
        />
      </div>

      <div className="detalle-info">
        <h1>{pelicula.title}</h1>
        <p><strong>Título original:</strong> {pelicula.original_title}</p>
        <p><strong>Director:</strong> {pelicula.director}</p>
        <p><strong>Año:</strong> {pelicula.release_date}</p>
        <p><strong>Puntuación:</strong> ⭐ {pelicula.rt_score}/100</p>
        <p><strong>Descripción:</strong> {pelicula.description}</p>

         <div className="botones-detalle">
          <div className="detalle-botones">
            <Link to="/peliculas" className="btn-volver">← Volver</Link>
            <button 
              onClick={() => toggleFavorito(pelicula, 'peliculas')} 
              className="btn-favorito-solo-icono"
            >
              {esFavorita ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalle;