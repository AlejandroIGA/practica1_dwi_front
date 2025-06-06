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
