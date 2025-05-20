import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputTitulo, setInputTitulo] = useState('');
  const [filtroRango, setFiltroRango] = useState('');

  const rangos = [
  { label: 'Todos los años', value: '' },
  { label: '1980 - 1984', value: '1980-1984' },
  { label: '1985 - 1989', value: '1985-1989' },
  { label: '1990 - 1994', value: '1990-1994' },
  { label: '1995 - 1999', value: '1995-1999' },
  { label: '2000 - 2004', value: '2000-2004' },
  { label: '2005 - 2009', value: '2005-2009' },
  { label: '2010 - 2014', value: '2010-2014' },
  { label: '2015 - 2019', value: '2015-2019' },
  { label: '2020 - 2025', value: '2020-2025' }
];

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

  const peliculasFiltradas = peliculas.filter((p) => {
    const tituloCoincide = p.title.toLowerCase().includes(inputTitulo.toLowerCase());

    let anioCoincide = true;
    if (filtroRango !== '') {
      const [inicio, fin] = filtroRango.split('-').map(Number);
      const anio = parseInt(p.release_date);
      anioCoincide = anio >= inicio && anio <= fin;
    }

    return tituloCoincide && anioCoincide;
  });

  const manejarBusquedaTitulo = (e) => {
    setInputTitulo(e.target.value);
  };

  const manejarSeleccionRango = (e) => {
    setFiltroRango(e.target.value);
  };

  if (loading) return <div className="loading">Cargando películas...</div>;

  return (
    <div className="peliculas-container">
      <h1>Películas de Studio Ghibli</h1>

      <div className="filtro-anio">
        <input
          type="text"
          placeholder="Buscar película"
          value={inputTitulo}
          onChange={manejarBusquedaTitulo}
          className="busqueda-input"
        />

        <select value={filtroRango} onChange={manejarSeleccionRango} className="busqueda-input">
          {rangos.map((rango) => (
            <option key={rango.value} value={rango.value}>
              {rango.label}
            </option>
          ))}
        </select>
      </div>

      <div className="peliculas-grid">
        {peliculasFiltradas.map((pelicula) => (
          <Link 
            to={`/peliculas/${pelicula.id}`} 
            key={pelicula.id} 
            className="pelicula-card"
          >
            <img
              src={pelicula.image}
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
