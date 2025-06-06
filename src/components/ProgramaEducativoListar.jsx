import React, { useEffect, useState } from 'react';
import axios from 'axios';
const ProgramaEducativoListar = () => {
  const [programas, setProgramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const API_URL = 'http://localhost:8080/api/pe';


 useEffect(() => {
  const soloActivos = true;
  const fetchProgramas = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: { soloActivos },
      });
      setProgramas(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  fetchProgramas();
}, []); 

  if (loading) return <p>Cargando programas educativos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Programas Educativos</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Clave</th>
            <th>Programa Educativo</th>
            <th>División</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {programas.map((programa) => (
            <tr key={programa.clave}>
              <td>{programa.clave}</td>
              <td>{programa.programaEducativo}</td>
              <td>{programa.division.clave}</td>
              <td>{programa.estado ? "ola No ta activo" : "TA ACTIVO PA"  }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramaEducativoListar;
