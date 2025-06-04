import React from 'react';

const Division = () => {
  return (
    
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto' }}>
      <h1>Gestión de Divisiones</h1>
      <form style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Clave:</label>
          <input type="text" name="id" placeholder="Ej: DIV01" required />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Nombre:</label>
          <input type="text" name="name" placeholder="Nombre de la división" required />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Estatus:</label>
          <select name="status" required>
            <option value="">-- Selecciona --</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <button type="submit">Guardar</button>
      </form>
      <div style={{ marginBottom: '2rem' }}>
        <label>Buscar por ID:</label>
        <input type="text" placeholder="Buscar ID" />
        <button>Buscar</button>
        <button>Limpiar</button>
      </div>
      <table border="1" width="100%" cellPadding="8">
        <thead>
          <tr>
            <th>Clave</th>
            <th>Nombre</th>
            <th>Estatus</th>
            <th>Programa educativo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>DIV01</td>
            <td>División Norte</td>
            <td>Activo</td>
            <td>Division 222</td>
            <td>
              <button>Editar</button>
              <button>Eliminar</button>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
};
export default Division;