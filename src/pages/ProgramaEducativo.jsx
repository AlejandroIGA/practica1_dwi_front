import { useState, useEffect } from "react";
import { obtenerProgramaEducativo, editarProgramaEducativo } from "../services/ServiceProgramaEducativo";
import { obtenerDivisiones } from "../services/ServiceDivision";
import { crearProgramaEducativo } from "../services/ServiceProgramaEducativo";


export function ProgramaEducativo() {
  const [error, setError] = useState('');
  const [programas, setProgramas] = useState([]);
  const [divisiones, setDivisiones] = useState([]);
  const [filtros, setFiltros] = useState({
    busqueda: "",
    id_division: "",
    soloActivos: false
  });

  const [formData, setFormData] = useState({
    id: "",
    clave: "",
    programa_educativo: "",
    id_division: "",
    activo: false
  });

  useEffect(() => {
    cargarProgramas();
    cargarDivisiones();
  }, [filtros.soloActivos]);

  const cargarProgramas = async () => {
    try {
      const data = await obtenerProgramaEducativo();
      setProgramas(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const cargarDivisiones = async () => {
    try {
      const data = await obtenerDivisiones();
      setDivisiones(data);
    } catch (err) {
      setError("Error al cargar divisiones: " + err.message);
    }
  };

  const handleFiltroChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFiltros({
      ...filtros,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    cargarProgramas();
  };

  const handleLimpiar = () => {
    setFiltros({
      busqueda: "",
      id_division: "",
      soloActivos: false
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (formData.id) {
      await editarProgramaEducativo(formData.id, {
        ...formData,
        id_division: Number(formData.id_division)
      });
      alert("Programa educativo actualizado correctamente");
    } else {
      await crearProgramaEducativo({
        clave: formData.clave,
        programa_educativo: formData.programa_educativo,
        activo: formData.activo,
        id_division: formData.id_division
      });
      alert("Programa educativo creado correctamente");
    }
    
    await cargarProgramas();
    
    setFormData({
      id: "",
      clave: "",
      programa_educativo: "",
      id_division: "",
      activo: false
    });
  } catch (err) {
    setError(err.message);
    alert("Error al guardar los cambios: " + err.message);
  }
};

  return (
    <div className="container">
      <h1>Programas educativos</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="section">
        <h2>Registro de Programas</h2>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={formData.id} onChange={handleFormChange} />

          <div className="form-group">
            <label>Clave:</label>
            <input
              type="text"
              name="clave"
              value={formData.clave}
              onChange={handleFormChange}
              required
              maxLength="20"
            />
          </div>

          <div className="form-group">
            <label>Programa educativo:</label>
            <input
              type="text"
              name="programa_educativo"
              value={formData.programa_educativo}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-group">
            <label>División:</label>
            <select
              name="id_division"
              value={formData.id_division}
              onChange={handleFormChange}
              required
            >
              <option value="">Seleccione división</option>
              {divisiones.map(division => (
                <option key={division.id} value={division.id}>
                  {division.nombre || `División ${division.id}`}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="activo"
                checked={formData.activo}
                onChange={handleFormChange}
              />
              Activo
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            {formData.id ? "Actualizar" : "Guardar"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setFormData({
              id: "",
              clave: "",
              programa_educativo: "",
              id_division: "",
              activo: false
            })}
          >
            Cancelar
          </button>
        </form>
      </div>

      <div className="section">
        <h2>Búsqueda</h2>
        <div className="search-filters">
          <input
            type="text"
            placeholder="Buscar por clave o nombre"
            name="busqueda"
            value={filtros.busqueda}
            onChange={handleFiltroChange}
            className="form-control"
          />
          <select
            name="id_division"
            value={filtros.id_division}
            onChange={handleFiltroChange}
            className="form-control"
          >
            <option value="">Todas las divisiones</option>
            {divisiones.map(division => (
              <option key={division.id} value={division.id}>
                {division.nombre || `División ${division.id}`}
              </option>
            ))}
          </select>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="soloActivos"
              checked={filtros.soloActivos}
              onChange={handleFiltroChange}
            />
            Mostrar solo activos
          </label>
          <button onClick={handleBuscar} className="btn btn-search">Buscar</button>
          <button onClick={handleLimpiar} className="btn btn-clear">Limpiar</button>
        </div>
      </div>

      <div className="section">
        <h2>Listado de programas</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Clave</th>
              <th>Programa Educativo</th>
              <th>División</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {programas.map(programa => (
              <tr key={programa.id}>
                <td>{programa.clave}</td>
                <td>{programa.programa_educativo}</td>
                <td>
                  {programa.division?.nombre || 
                   divisiones.find(d => d.id === programa.id_division)?.nombre || 
                   `División ${programa.id_division}`}
                </td>
                <td>{programa.activo ? 'Activo' : 'Inactivo'}</td>
                <td>
                  <button
                    onClick={() => setFormData({
                      id: programa.id,
                      clave: programa.clave,
                      programa_educativo: programa.programa_educativo,
                      id_division: programa.division?.id || programa.id_division || "",
                      activo: programa.activo
                    })}
                    className="btn btn-edit"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
