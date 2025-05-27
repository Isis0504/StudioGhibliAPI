import { useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';
import './styleR.css'; // Archivo de estilos para registro

function Registro() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    password: '',
    fechaNacimiento: '',
    telefono: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Crear usuario en Auth
      const { data, error: errorAuth } = await supabase.auth.signUp({
        email: formulario.correo,
        password: formulario.password,
      });

      if (errorAuth) throw errorAuth;

      const uid = data.user.id;

      // 2. Insertar en tabla "usuarios"
      const { error: errorInsert } = await supabase.from("usuario").insert([{
        id: uid,
        nombre: formulario.nombre,
        correo: formulario.correo,
        fecha_nacimiento: formulario.fechaNacimiento,
        telefono: formulario.telefono,
        roll: "usuario",
      }]);

      if (errorInsert) throw errorInsert;
      
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Crear Cuenta</h2>
        
        {error && <div className="register-error">{error}</div>}
        
        <form onSubmit={handleRegistro} className="register-form">
          <div className="input-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              placeholder="Tu nombre completo"
              value={formulario.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              name="correo"
              placeholder="tu@email.com"
              value={formulario.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formulario.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
            <input
              id="fechaNacimiento"
              type="date"
              name="fechaNacimiento"
              value={formulario.fechaNacimiento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              id="telefono"
              type="tel"
              name="telefono"
              placeholder="Número de teléfono"
              value={formulario.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="register-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Creando cuenta...
              </>
            ) : 'Registrarse'}
          </button>

          <div className="login-link">
            <p>¿Ya tienes cuenta? <button 
              type="button" 
              className="login-button"
              onClick={() => navigate("/login")}
            >
              Inicia sesión
            </button></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registro;