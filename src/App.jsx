import { useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Inicio from './Componentes/Inicio';
import Peliculas from './Componentes/Peliculas';
import Detalle from './Componentes/Peliculas/Detalle';
import DetallePersonaje from './Componentes/Personajes/DetallePersonaje';
import Personajes from './Componentes/Personajes';
import Favoritos from './Componentes/Favoritos';
import TestGhibli from './Componentes/TestGhibli';
import Sorpresa from './Componentes/Sorpresa';
import Menu from './Componentes/Menu';

import './App.css';

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/peliculas" element={<Peliculas />} />
        <Route path="/peliculas/:id" element={<Detalle />} />
        <Route path="/personajes" element={<Personajes />} />
        <Route path="/personajes/:id" element={<DetallePersonaje />} />
        <Route path="/Favoritos" element={<Favoritos />} />
        <Route path="/TestGhibli" element={<TestGhibli />} />
        <Route path="/Sorpresa" element={<Sorpresa />} />
      </Routes>
    </Router>
  );
}

export default App;
