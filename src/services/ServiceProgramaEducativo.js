import api from './api';

export const obtenerProgramaEducativo = async (soloActivos = false) => {
  const res = await api.get(`/pe`, {
    params: { soloActivos },
  });
  return res.data;
};

export const editarProgramaEducativo = async (id, programaData) => {
  try {
    const dataToSend = {
      clave: programaData.clave,
      programa_educativo: programaData.programa_educativo,
      activo: programaData.activo,
      division: {
        id: programaData.id_division 
      }
    };
    
    const res = await api.put(`/pe/${id}`, dataToSend);
    return res.data;
  } catch (error) {
    console.error("Error al editar programa educativo:", error);
    throw error;
  }
};

export async function crearProgramaEducativo(data) {
  const response = await fetch(`http://localhost:8080/api/pe?idDivision=${data.id_division}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      clave: data.clave,
      programa_educativo: data.programa_educativo,
      activo: data.activo
    }),
  });

  if (!response.ok) {
    throw new Error("Error al crear el programa educativo");
  }

  return await response.json();
}

