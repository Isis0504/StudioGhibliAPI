import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputAnio, setInputAnio] = useState('');
  const [inputTitulo, setInputTitulo] = useState('');
  const [filtroAnio, setFiltroAnio] = useState('');

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

  // Función que filtra las películas por título y año
  const peliculasFiltradas = peliculas.filter((p) => {
    const coincideAnio = filtroAnio === '' || p.release_date.includes(filtroAnio);
    const coincideTitulo = p.title.toLowerCase().includes(inputTitulo.toLowerCase());
    return coincideAnio && coincideTitulo;
  });

  const manejarFiltro = () => {
    setFiltroAnio(inputAnio);
  };

  const manejarBusquedaTitulo = (e) => {
    setInputTitulo(e.target.value);
  };

  const manejarFiltroAnio = (e) => {
    setInputAnio(e.target.value);
    setFiltroAnio(e.target.value);
  };

  if (loading) return <div className="loading">Cargando películas...</div>;

  return (
    <div className="peliculas-container">
      <h1>Películas de Studio Ghibli</h1>

      <div className="filtro-anio">
        <input
          type="text"
          placeholder="Buscar pelicula"
          value={inputTitulo}
          onChange={manejarBusquedaTitulo}
          className="busqueda-input"
        />
        <input
          type="text"
          placeholder="Filtrar por año"
          value={inputAnio}
          onChange={manejarFiltroAnio}
          className="busqueda-input"
        />
        
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
