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

  const personajesFiltrados = personajes.filter((p) => {
    const coincideNombre = p.name.toLowerCase().includes(inputNombre.toLowerCase());
    const coincideGenero = filtroGenero === '' || p.gender.toLowerCase() === filtroGenero.toLowerCase();

    let coincideEdad = true;

    if (filtroEdad) {
      const edad = p.age;

      if (filtroEdad === 'no-numerica') {
        // Filtrar personajes cuya edad no es un número
        coincideEdad = isNaN(parseInt(edad));
      } else {
        // Filtrar por rango numérico
        const [min, max] = filtroEdad.split('-').map(Number);
        const edadNum = parseInt(edad);
        coincideEdad = !isNaN(edadNum) && edadNum >= min && edadNum <= max;
      }
    }

    return coincideNombre && coincideGenero && coincideEdad;
  });

  const manejarBusquedaNombre = (e) => setInputNombre(e.target.value);
  const manejarFiltroGenero = (e) => setFiltroGenero(e.target.value);
  const manejarFiltroEdad = (e) => setFiltroEdad(e.target.value);

  const getCharacterImage = (name) => {
    const character = ghibliCharacters.find(char =>
      char.name.toLowerCase() === name.toLowerCase()
    );

    if (character?.image) return character.image;

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
        <select
          value={filtroEdad}
          onChange={manejarFiltroEdad}
          className="busqueda-input"
        >
          <option value="">Todas las edades</option>
          <option value="1-10">1 - 10</option>
          <option value="11-20">11 - 20</option>
          <option value="21-30">21 - 30</option>
          <option value="31-40">31 - 40</option>
          <option value="41-50">41 - 50</option>
          <option value="51-60">51 - 60</option>
          <option value="61-70">61 - 70</option>
          <option value="71-80">71 - 80</option>
          <option value="81-90">81 - 90</option>
          <option value="no-numerica">Edad no numérica</option>
        </select>
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