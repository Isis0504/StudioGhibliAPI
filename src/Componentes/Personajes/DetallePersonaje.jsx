import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ghibliCharacters from '../../Data/ghibliCharacters.json';
import './styleDet.css';

const DetallePersonajes = () => {
  const { id } = useParams();
  const [personaje, setPersonaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [esFavorito, setEsFavorito] = useState(false);

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

  const getCharacterImage = (name) => {
    const character = ghibliCharacters.find(char => char.name === name);
    return character?.image || null;
  };

  const toggleFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (!personaje) return <div className="error">Personaje no encontrado</div>;

  const characterImage = getCharacterImage(personaje.name);

  return (
    <div className="detalle-container">
      <div className="detalle-img-container">
        {characterImage ? (
          <img 
            src={characterImage} 
            alt={personaje.name}
            className="detalle-img"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/300?text=${personaje.name.charAt(0)}`;
            }}
          />
        ) : (
          <div className="detalle-img-placeholder">
            {personaje.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="detalle-info">
        <h1>{personaje.name}</h1>
        <p><strong>Género:</strong> {personaje.gender || 'No especificado'}</p>
        <p><strong>Edad:</strong> {personaje.age || 'Desconocida'}</p>
        <p><strong>Color de ojos:</strong> {personaje.eye_color || 'Desconocido'}</p>
        <p><strong>Color de cabello:</strong> {personaje.hair_color || 'Desconocido'}</p>

        <div className="botones-detalle">
        <div className="detalle-botones">
  <Link to="/personajes" className="btn-volver">← Volver</Link>
  <button onClick={toggleFavorito} className="btn-favorito-solo-icono">
    {esFavorito ? '❤️' : '🤍'}
  </button>
</div>

        </div>
      </div>
    </div>
  );
};

export default DetallePersonajes;
