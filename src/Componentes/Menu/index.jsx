import { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function Menu() {
  return (
    <nav className="c-menu">
      <Link to="/">Inicio</Link>
      <Link to="/Peliculas">Películas</Link>
      <Link to="/Personajes">Personajes</Link>
      <Link to="/Favoritos">Favoritos</Link>
      <Link to="/TestGhibli">Test Ghibli</Link>
      <Link to="/Sorpresa">Sorpresa</Link>
    </nav>
  )
}

export default Menu
