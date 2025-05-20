import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../Contexto/contexto';
import ghibliCharacters from '../../Data/ghibliCharacters.json';
import './style.css';

const Favoritos = () => {
  const { favoritos } = useContext(AppContext);
  const { personajes = [], peliculas = [] } = favoritos || {};
  const totalFavoritos = personajes.length + peliculas.length;

  const getCharacterImage = (characterName) => {
    const character = ghibliCharacters.find(char => char.name === characterName);
    return character?.image || 'https://via.placeholder.com/300x250?text=Imagen+no+disponible';
  };

  if (totalFavoritos === 0) {
    return (
      <div className="no-favoritos">
        <h2>No tienes favoritos aún</h2>
        <div className="botones-explorar">
          <Link to="/personajes" className="btn btn-explorar btn-primary">
            Explorar personajes
          </Link>
          <Link to="/peliculas" className="btn btn-explorar btn-primary">
            Explorar películas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="favoritos-container">
      <h1>Tus Favoritos</h1>
      
      <div className="two-column-layout">
        {/* Columna izquierda - Películas */}
        <div className="column peliculas-column">
          {peliculas.length > 0 ? (
            <>
              <h2>Películas Favoritas ({peliculas.length})</h2>
              <div className="peliculas-grid">
                {peliculas.map(pelicula => (
                  <div key={`pelicula-${pelicula.id}`} className="card pelicula-card">
                    <img 
                      src={pelicula.image || 'https://via.placeholder.com/300x350?text=Poster+no+disponible'} 
                      className="card-img-top" 
                      alt={pelicula.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{pelicula.title}</h5>
                      <p className="card-text">
                        <strong>Año:</strong> {pelicula.release_date}
                      </p>
                      <p className="card-text">
                        <strong>Puntuación:</strong> ⭐ {pelicula.rt_score}/100
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-section">
              <h2>Películas Favoritas</h2>
              <p>No tienes películas favoritas aún</p>
              <Link to="/peliculas" className="btn btn-explorar">
                Explorar películas
              </Link>
            </div>
          )}
        </div>

        {/* Columna derecha - Personajes */}
        <div className="column personajes-column">
          {personajes.length > 0 ? (
            <>
              <h2>Personajes Favoritos ({personajes.length})</h2>
              <div className="personajes-grid">
                {personajes.map(personaje => (
                  <div key={`personaje-${personaje.id}`} className="card personaje-card">
                    <img 
                      src={getCharacterImage(personaje.name)} 
                      className="card-img-top" 
                      alt={personaje.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{personaje.name}</h5>
                      <p className="card-text">
                        <strong>Género:</strong> {personaje.gender || 'No especificado'}
                      </p>
                      <p className="card-text">
                        <strong>Edad:</strong> {personaje.age || 'Desconocida'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-section">
              <h2>Personajes Favoritos</h2>
              <p>No tienes personajes favoritos aún</p>
              <Link to="/personajes" className="btn btn-explorar">
                Explorar personajes
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favoritos;