import { useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Inicio from './Componentes/Inicio';
import Peliculas from './Componentes/Peliculas';
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
        <Route path="/Peliculas" element={<Peliculas />} />
        <Route path="/Personajes" element={<Personajes />} />
        <Route path="/Favoritos" element={<Favoritos />} />
        <Route path="/TestGhibli" element={<TestGhibli />} />
        <Route path="/Sorpresa" element={<Sorpresa />} />
      </Routes>
    </Router>
  );
}

export default App;
