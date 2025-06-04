import React, { useEffect, useState } from 'react';

const ProgramaEducativoListar = () => {
  const [programas, setProgramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const API_URL = 'https://localhost:8080/api/pe';

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al cargar los datos');
        }
        return res.json();
      })
      .then((data) => {
        setProgramas(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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
              <td>{programa.division}</td>
              <td>{programa.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramaEducativoListar;
