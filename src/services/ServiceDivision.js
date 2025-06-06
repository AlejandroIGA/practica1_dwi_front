import api from './api';

export const Agregardivision = async (values) => {
  try {
    const response = await api.post("/division", values);
    console.log("Respuesta del backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al agregar división:", error);
    throw error.response?.data?.message || "Error al agregar división";
  }
};

export const obtenerDivisiones = async (soloActivos = false) => {
  const res = await api.get(`/division`, {
    params: { soloActivos },
  });
  return res.data;
};

export const obtenerDivisionPorId = async (id) => {
  try {
    const response = await api.get(`/division/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al encontrar division:", error);
      throw error.response?.data?.message || "División no encontrada";
  }
};
