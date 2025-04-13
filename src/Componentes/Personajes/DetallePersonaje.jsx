import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './style.css';

const DetallePersonajes = () => {
  const { id } = useParams();
  const [personaje, setPersonaje] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://ghibliapi.dev/people/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPersonaje(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching personaje:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Cargando...</div>;
  if (!personaje) return <div className="error">Personaje no encontrado</div>;

  return (
    <div className="detalle-container">
      <div className="detalle-img-placeholder">
        {personaje.name.charAt(0)}
      </div>
      <div className="detalle-info">
        <h1>{personaje.name}</h1>
        <p><strong>Género:</strong> {personaje.gender || 'No especificado'}</p>
        <p><strong>Edad:</strong> {personaje.age || 'Desconocida'}</p>
        <p><strong>Especie:</strong> {personaje.species || 'Humano'}</p>
        <p><strong>Película:</strong> {personaje.films[0] || 'Sin datos'}</p>
        <Link to="/personajes" className="btn-volver">← Volver</Link>
      </div>
    </div>
  );
};

export default DetallePersonajes;