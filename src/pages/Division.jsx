import React, { useEffect, useState } from 'react';
import { Agregardivision, obtenerDivisiones, obtenerDivisionPorId } from '../services/ServiceDivision';

const Division = () => {
  const [formData, setFormData] = useState({ clave: '', nombre: '', activo: '' });
  const [divisiones, setDivisiones] = useState([]);
  const [buscarId, setBuscarId] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    cargarDivisiones();
  }, []);

  const cargarDivisiones = async () => {
    try {
      const data = await obtenerDivisiones();
      setDivisiones(data);
      console.log(data);
    } catch (error) {
      setError(error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBuscarChange = (e) => {
    setBuscarId(e.target.value);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const datos = {...formData,activo: parseInt(formData.activo),};
    await Agregardivision(datos);
    setMensaje("División agregada correctamente.");
    setFormData({ nombre: '', clave: '', activo: '' });
    cargarDivisiones();
  } catch (err) {
    setError(err);
  }
};


  const handleBuscar = async () => {
    try {
      const division = await obtenerDivisionPorId(buscarId);
      setDivisiones([division]);
      setMensaje(`Resultado para ID: ${buscarId}`);
    } catch (err) {
      setError(err);
      setDivisiones([]);
    }
  };

  const handleLimpiar = () => {
    setBuscarId('');
    setMensaje('');
    setError('');
    cargarDivisiones();
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto' }}>
      <h1>Gestión de Divisiones</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Clave:</label>
          <input
            type="text"
            name="clave"
            value={formData.clave}
            onChange={handleInputChange}
            placeholder="Ej: DIV01"
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Nombre de la división"
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Estatus:</label>
          <select
            name="activo"
            value={formData.activo}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Selecciona --</option>
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </select>
        </div>
        <button type="submit">Guardar</button>
      </form>

      <div style={{ marginBottom: '2rem' }}>
        <label>Buscar por ID:</label>
        <input
          type="text"
          value={buscarId}
          onChange={handleBuscarChange}
          placeholder="Buscar ID"
          
        />
        <button onClick={handleBuscar}>Buscar</button>
        <button onClick={handleLimpiar}>Limpiar</button>
      </div>
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1" width="100%" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Clave</th>
            <th>Nombre</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {divisiones.length > 0 ? (
            divisiones.map((div) => (
              <tr key={div.id}>
                <td>{div.id}</td>
                <td>{div.clave}</td>
                <td>{div.nombre}</td>
                <td>{div.activo ? 'Activo' : 'Inactivo'}</td>
                <td>
                  <button disabled>Editar</button>
                  <button disabled>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No hay resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Division;