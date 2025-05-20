import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  // Estado inicial con valores por defecto seguros
  const [favoritos, setFavoritos] = useState({
    personajes: [],
    peliculas: []
  });

  // Cargar favoritos del localStorage de forma segura
  useEffect(() => {
    try {
      const guardados = localStorage.getItem('ghibli-favoritos');
      if (guardados) {
        const parsed = JSON.parse(guardados);
        // Validamos la estructura
        if (parsed.personajes && parsed.peliculas) {
          setFavoritos(parsed);
        }
      }
    } catch (error) {
      console.error("Error cargando favoritos:", error);
      localStorage.removeItem('ghibli-favoritos');
    }
  }, []);

  // Función segura para manejar favoritos
  const toggleFavorito = (item, tipo) => {
    try {
      setFavoritos(prev => {
        // Aseguramos que prev tenga la estructura correcta
        const prevSafe = {
          personajes: prev?.personajes || [],
          peliculas: prev?.peliculas || []
        };

        // Buscamos si ya existe
        const existe = prevSafe[tipo].some(fav => fav.id === item.id);

        return {
          ...prevSafe,
          [tipo]: existe 
            ? prevSafe[tipo].filter(fav => fav.id !== item.id)
            : [...prevSafe[tipo], item]
        };
      });
    } catch (error) {
      console.error("Error al actualizar favoritos:", error);
    }
  };

  // Persistir en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ghibli-favoritos', JSON.stringify(favoritos));
    } catch (error) {
      console.error("Error guardando favoritos:", error);
    }
  }, [favoritos]);

  return (
    <AppContext.Provider value={{ favoritos, toggleFavorito }}>
      {children}
    </AppContext.Provider>
  );
}