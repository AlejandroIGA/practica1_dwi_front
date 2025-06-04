export function ProgramaEducativo() {
  return (
    <div>
      <h1>Programas educativos</h1>
      
      <div>
        <h2>Registro de programas</h2>
        <form>
          <input type="hidden" name="id" />
          
          <div>
            <label>Clave:</label>
            <input type="text" name="clave" required maxLength="20" />
          </div>
          
          <div>
            <label>Programa educativo:</label>
            <input type="text" name="programa_educativo" required />
          </div>
          
          <div>
            <label>División:</label>
            <select name="id_division" required>
              <option value="">Seleccione división</option>
              <option value="1">DTAI</option>
              <option value="2">DAM</option>
            </select>
          </div>
          
          <div>
            <label>
              <input type="checkbox" name="activo" />
              Activo
            </label>
          </div>
          
          <button type="submit">Guardar</button>
          <button type="button">Cancelar</button>
        </form>
      </div>
      
      <div>
        <h2>Búsqueda</h2>
        <div>
          <input type="text" placeholder="Buscar por clave o nombre" />
          <select>
            <option value="">Todas las divisiones</option>
            <option value="1">DTAI</option>
            <option value="2">DAM</option>
          </select>
          <label>
            <input type="checkbox" />
            Mostrar solo activos
          </label>
          <button>Buscar</button>
          <button>Limpiar</button>
        </div>
      </div>
      
      <div>
        <h2>Programas registrados</h2>
        <table>
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
            
            <tr>
              <td>IDGS</td>
              <td>Ingeniería en Desarrolllo y Gestión de Software</td>
              <td>División de tecnologias de automatización e información</td>
              <td>Activo</td>
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
            
            <tr>
              <td>IRIC</td>
              <td>Ingenieria en redes inteligentes y ciberseguridad</td>
              <td>División de tecnologias de automatización e información</td>
              <td>Activo</td>
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
