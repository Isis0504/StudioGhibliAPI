import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../../Contexto/contexto';
import ghibliCharacters from '../../Data/ghibliCharacters.json';
import './styleDet.css';

const DetallePersonajes = () => {
  const { id } = useParams();
  const [personaje, setPersonaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const { favoritos = { personajes: [], peliculas: [] }, toggleFavorito } = useContext(AppContext);
  
  // Verificación segura de favoritos
  const esFavorito = favoritos.personajes.some(fav => fav.id === personaje?.id);

  useEffect(() => {
    const fetchPersonaje = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://ghibliapi.dev/people/${id}`);
        if (!response.ok) throw new Error("Personaje no encontrado");
        const data = await response.json();
        setPersonaje(data);
      } catch (error) {
        console.error("Error fetching personaje:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonaje();
  }, [id]);

  const getCharacterImage = (name) => {
    const character = ghibliCharacters.find(char => char.name === name);
    return character?.image || null;
  };

  const handleFavorito = () => {
    if (personaje) {
      console.log("Agregando a favoritos:", personaje); // Debug
      toggleFavorito(personaje, 'personajes');
    }
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
          <div className="detalle-botones1">
            <Link to="/personajes" className="btn-volver">← Volver</Link>
            <button 
              onClick={handleFavorito} 
              className="btn-favorito-solo-icono"
            >
              {esFavorito ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallePersonajes;