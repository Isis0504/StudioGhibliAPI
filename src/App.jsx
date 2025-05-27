import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AppProvider } from './Contexto/contexto';
import { supabase } from "./supabase"; // Asegúrate de tener este archivo configurado

// Componentes
import Inicio from './Componentes/Inicio';
import Peliculas from './Componentes/Peliculas';
import Detalle from './Componentes/Peliculas/Detalle';
import DetallePersonaje from './Componentes/Personajes/DetallePersonaje';
import Personajes from './Componentes/Personajes';
import Locaciones from './Componentes/Locaciones';
import Favoritos from './Componentes/Favoritos';
import TestGhibli from './Componentes/TestGhibli';
import Menu from './Componentes/Menu';
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';
import Usuario from './Componentes/Usuario';
import './App.css';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function verificarSesion() {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user || null);
      setCargando(false);
    }
    verificarSesion();

    // Escucha cambios en la sesión
    supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user || null);
    });
  }, []);

  if (cargando) return <p>Cargando...</p>;

  return (
    <AppProvider>
      <Router>
        {usuario && <Menu />} {/* Menú solo visible cuando hay usuario */}
        
        <Routes>
          {/* Rutas protegidas */}
          <Route path="/" element={usuario ? <Inicio/> : <Navigate to="/login"/>} />
          <Route path="/peliculas" element={usuario ? <Peliculas/> : <Navigate to="/login" />} />
          <Route path="/peliculas/:id" element={usuario ? <Detalle/> : <Navigate to="/login" />} />
          <Route path="/personajes" element={usuario ? <Personajes/> : <Navigate to="/login" />} />
          <Route path="/personajes/:id" element={usuario ? <DetallePersonaje/> : <Navigate to="/login" />} />
          <Route path="/locaciones" element={usuario ? <Locaciones/> : <Navigate to="/login" />} />
          <Route path="/favoritos" element={usuario ? <Favoritos/> : <Navigate to="/login" />} />
          <Route path="/TestGhibli" element={usuario ? <TestGhibli/> : <Navigate to="/login" />} />
          <Route path="/Usuario" element={usuario ? <Usuario/> : <Navigate to="/login" />} />

          {/* Rutas públicas */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/Registro" element={<Registro/>}/>
        
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;