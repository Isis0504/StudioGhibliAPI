import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ghibliCharacters from '../../Data/ghibliCharacters.json';
import './style.css';

const Personajes = () => {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputNombre, setInputNombre] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('');
  const [filtroEdad, setFiltroEdad] = useState('');

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

  // Función que filtra los personajes por nombre, género y edad
  const personajesFiltrados = personajes.filter((p) => {
    const coincideNombre = p.name.toLowerCase().includes(inputNombre.toLowerCase());
    const coincideGenero = filtroGenero === '' || p.gender.toLowerCase() === filtroGenero.toLowerCase();
    const coincideEdad = filtroEdad === '' || p.age?.toString().startsWith(filtroEdad);
    return coincideNombre && coincideGenero && coincideEdad;
  });

  const manejarBusquedaNombre = (e) => {
    setInputNombre(e.target.value);
  };

  const manejarFiltroGenero = (e) => {
    setFiltroGenero(e.target.value);
  };

  const manejarFiltroEdad = (e) => {
    setFiltroEdad(e.target.value);
  };

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

      <div className="filtro-personaje">
        <input
          type="text"
          placeholder="Buscar personaje"
          value={inputNombre}
          onChange={manejarBusquedaNombre}
          className="busqueda-input"
        />
        <select
          value={filtroGenero}
          onChange={manejarFiltroGenero}
          className="busqueda-input"
        >
          <option value="">Filtrar por género</option>
          <option value="Male">Masculino</option>
          <option value="Female">Femenino</option>
          <option value="Other">Otro</option>
        </select>
        <input
          type="text"
          placeholder="Filtrar por edad"
          value={filtroEdad}
          onChange={manejarFiltroEdad}
          className="busqueda-input"
        />
      </div>

      <div className="personajes-grid">
        {personajesFiltrados.map((personaje) => (
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
            <p>{personaje.age || 'Edad no especificada'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Personajes;
