import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ghibliCharacters from '../../Data/ghibliCharacters.json';
import './style.css';

const Personajes = () => {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ghibliapi.dev/people')
      .then((response) => response.json())
      .then((data) => {
        setPersonajes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching personajes:", error);
        setLoading(false);
      });
  }, []);

  // Función para buscar la imagen por nombre
  const getCharacterImage = (name) => {
    const character = ghibliCharacters.find(char => char.name === name);
    return character?.image || `https://via.placeholder.com/150?text=${name.charAt(0)}`;
  };

  if (loading) return <div className="loading">Cargando personajes...</div>;

  return (
    <div className="personajes-container">
      <h1>Personajes de Studio Ghibli</h1>
      <div className="personajes-grid">
        {personajes.map((personaje) => (
          <Link 
            to={`/personajes/${personaje.id}`} 
            key={personaje.id} 
            className="personaje-card"
          >
            <img
              src={getCharacterImage(personaje.name)}
              alt={personaje.name}
              className="personaje-img"
              onError={(e) => { 
                e.target.src = `https://via.placeholder.com/150?text=${personaje.name.charAt(0)}`;
              }}
            />
            <h3>{personaje.name}</h3>
            <p>{personaje.gender || 'Género no especificado'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Personajes;