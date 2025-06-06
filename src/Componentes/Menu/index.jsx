import { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function Menu() {
  return (
    <nav className="c-menu">
      <Link to="/">Inicio</Link>
      <Link to="/Peliculas">Películas</Link>
      <Link to="/Personajes">Personajes</Link>
      <Link to="/Locaciones">Locaciones</Link>
      <Link to="/Favoritos">Favoritos</Link>
      <Link to="/TestGhibli">Test Ghibli</Link>
      <Link to="/Usuario">Mi Usuario</Link>
    </nav>
  )
}

export default Menu
