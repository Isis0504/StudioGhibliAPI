import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function Inicio() {
  const [featuredMovies, setFeaturedMovies] = useState([])
  const [featuredCharacters, setFeaturedCharacters] = useState([])
  const [loading, setLoading] = useState(true)

  // IDs o títulos de las películas que quieres mostrar (puedes cambiarlos)
  const selectedMovieIds = ['2baf70d1-42bb-4437-b551-e5fed5a87abe', '12cfb892-aac0-4c5b-94af-521852e46d6a', '58611129-2dbc-4a81-a72f-77ddfc1b1b49']
  
  // Nombres de los personajes que quieres mostrar (deben coincidir exactamente con tu JSON)
  const selectedCharacterNames = ['Totoro', 'Chihiro Ogino', 'Granny']

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar todas las películas y filtrar las seleccionadas
        const moviesResponse = await fetch('https://ghibliapi.dev/films')
        const allMovies = await moviesResponse.json()
        
        const filteredMovies = allMovies.filter(movie => 
          selectedMovieIds.includes(movie.id)
        )
        setFeaturedMovies(filteredMovies)

        // Cargar personajes desde el archivo local y filtrar los seleccionados
        try {
          const charactersData = await import('../../Data/ghibliCharacters.json')
          const filteredCharacters = charactersData.default.filter(character =>
            selectedCharacterNames.includes(character.name)
          )
          setFeaturedCharacters(filteredCharacters)
        } catch (error) {
          console.error("Error cargando personajes:", error)
          // Datos de respaldo
          setFeaturedCharacters([
            { name: 'Totoro', image: 'https://www.studioghibli.com.au/wp-content/uploads/2017/07/portrait-totoro.png' },
            { name: 'Chihiro Ogino', image: 'https://www.studioghibli.com.au/wp-content/uploads/2017/07/chihiro.png' },
            { name: 'Sophie', image: 'https://www.studioghibli.com.au/wp-content/uploads/2017/07/sophie.png' }
          ])
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="loading">Cargando magia Ghibli...</div>
  }

  return (
    <div className="ghibli-home">
      {/* Hero Section */}
      <section className="ghibli-hero">
        <div className="hero-overlay">
          <h1>Bienvenido al Mundo de Studio Ghibli</h1>
          <p>Explora la magia, los personajes y los lugares de tus películas favoritas</p>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="navigation-cards">
        <Link to="/Peliculas" className="nav-card">
          <div className="card-icon">🎬</div>
          <h3>Películas</h3>
          <p>Descubre todas las obras maestras de Ghibli</p>
        </Link>

        <Link to="/Personajes" className="nav-card">
          <div className="card-icon">👥</div>
          <h3>Personajes</h3>
          <p>Conoce a los memorables personajes</p>
        </Link>

        <Link to="/Locaciones" className="nav-card">
          <div className="card-icon">🗺️</div>
          <h3>Locaciones</h3>
          <p>Explora los mágicos lugares de Ghibli</p>
        </Link>

        <Link to="/TestGhibli" className="nav-card">
          <div className="card-icon">✨</div>
          <h3>Test Ghibli</h3>
          <p>Que tanto sabes de Studio Ghibli?</p>
        </Link>
      </section>

      {/* Featured Content Preview */}
      <section className="featured-preview">
        <div className="preview-section">
          <h2>Películas Destacadas</h2>
          <div className="movie-grid">
            {featuredMovies.map(movie => (
              <div key={movie.id} className="movie-thumbnail">
                <img 
                  src={movie.image || `https://via.placeholder.com/200x300?text=${encodeURIComponent(movie.title)}`} 
                  alt={movie.title} 
                />
                <div className="movie-info">
                  <h4>{movie.title}</h4>
                  <p>{movie.release_date.split('-')[0]}</p>
                  <p className="movie-director">{movie.director}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/Peliculas" className="see-more">Ver todas las películas →</Link>
        </div>

        <div className="preview-section">
          <h2>Personajes Populares</h2>
          <div className="character-carousel">
            {featuredCharacters.map((character, index) => (
              <div key={index} className="character-card">
                <div 
                  className="character-image" 
                  style={{backgroundImage: `url(${character.image || 'https://via.placeholder.com/150?text='+character.name})`}}
                ></div>
                <h4>{character.name}</h4>
                {character.film && <p className="character-film">{character.film}</p>}
              </div>
            ))}
          </div>
          <Link to="/Personajes" className="see-more">Ver todos los personajes →</Link>
        </div>
      </section>
    </div>
  )
}

export default Inicio