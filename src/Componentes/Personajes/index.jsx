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

  const getCharacterImage = (name) => {
    const character = ghibliCharacters.find(char => 
      char.name.toLowerCase() === name.toLowerCase()
    );
    
    if (character?.image) return character.image;
    
    // Obtener iniciales (primera letra de cada palabra para nombres compuestos)
    const initials = name.split(' ')
      .filter(word => word.length > 0)
      .map(word => word[0].toUpperCase())
      .join('');
    
    return `https://via.placeholder.com/150/cccccc/333333?text=${encodeURIComponent(initials)}`;
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
                const initials = personaje.name.split(' ')
                  .filter(word => word.length > 0)
                  .map(word => word[0].toUpperCase())
                  .join('');
                e.target.src = `https://via.placeholder.com/150/cccccc/333333?text=${encodeURIComponent(initials)}`;
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