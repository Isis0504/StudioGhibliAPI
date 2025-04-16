import React, { useState, useEffect } from "react";
import ghibliLocations from "../../Data/locations.json";
import "./styleL.css";

const Locaciones = () => {
  const [locaciones, setLocaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputNombre, setInputNombre] = useState('');
  const [filtroClima, setFiltroClima] = useState('');
  const [filtroTerreno, setFiltroTerreno] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("https://ghibliapi.dev/locations");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        // Verifica que los datos de la API tengan la estructura esperada
        if (!data || data.length === 0) {
          throw new Error("La API no devolvió locaciones");
        }

        // Combina con las imágenes de tu JSON
        const dataConImagenes = data.map((item) => {
          const locacionConImagen = ghibliLocations.find(
            loc => item.name.toLowerCase().includes(loc.name.toLowerCase())
          );
          
          return {
            ...item,
            image: locacionConImagen?.image || null
          };
        });

        setLocaciones(dataConImagenes);
        
      } catch (error) {
        console.error("Error al obtener locaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Función que filtra las locaciones por nombre, clima y terreno
  const locacionesFiltradas = locaciones.filter((locacion) => {
    const coincideNombre = locacion.name.toLowerCase().includes(inputNombre.toLowerCase());
    const coincideClima = filtroClima === '' || locacion.climate.toLowerCase() === filtroClima.toLowerCase();
    const coincideTerreno = filtroTerreno === '' || locacion.terrain.toLowerCase() === filtroTerreno.toLowerCase();
    return coincideNombre && coincideClima && coincideTerreno;
  });

  const manejarBusquedaNombre = (e) => {
    setInputNombre(e.target.value);
  };

  const manejarFiltroClima = (e) => {
    setFiltroClima(e.target.value);
  };

  const manejarFiltroTerreno = (e) => {
    setFiltroTerreno(e.target.value);
  };

  if (loading) return <div className="loading">Cargando locaciones...</div>;

  return (
    <div className="locaciones-container">
      <h1>Locaciones de Studio Ghibli</h1>

      <div className="filtro-locaciones">
        <input
          type="text"
          placeholder="Buscar locación por nombre"
          value={inputNombre}
          onChange={manejarBusquedaNombre}
          className="busqueda-input"
        />
        <select
          value={filtroClima}
          onChange={manejarFiltroClima}
          className="filtro-select"
        >
          <option value="">Seleccionar clima</option>
          <option value="Dry">Seco</option>
          <option value="Mild">Leve</option>
          <option value="Wet">Mojado</option>
          <option value="tropical">Tropical</option>
          <option value="continental">Continental</option>
          <option value="TODO">TODO</option>
        </select>
        <select
          value={filtroTerreno}
          onChange={manejarFiltroTerreno}
          className="filtro-select"
        >
          <option value="">Seleccionar terreno</option>
          <option value="forest">Bosque</option>
          <option value="Hill">Loma</option>
          <option value="City">Ciudad</option>
          <option value="Marsh">Pantano</option>
          <option value="River">Rio</option>
          <option value="Plain">Llanura</option>
          <option value="mountain">Montaña</option>
          <option value="ocean">Océano</option>
          <option value="TODO">TODO</option>
        </select>
      </div>

      <div className="locaciones-grid">
        {locacionesFiltradas.map((locacion) => (
          <div key={locacion.id} className="locacion-card">
            <img
              src={locacion.image || `https://via.placeholder.com/300x200?text=${locacion.name.split(" ")[0]}`}
              alt={locacion.name}
              className="locacion-img"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/300x200?text=Imagen+no+disponible`;
              }}
            />
            <div className="locacion-info">
              <h3>{locacion.name}</h3>
              <p>Clima: {locacion.climate || "Desconocido"}</p>
              <p>Terreno: {locacion.terrain || "Desconocido"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locaciones;
