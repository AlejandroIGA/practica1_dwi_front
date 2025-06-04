import React from "react";
import FormularioDatos from "../../components/FormDivision/FormDivision";
import Lista from "../../components/ListaDivision/ListaDivision";
import "./Division.css";

function Division() {
  return (
    <div className="division-page-container">
      <div className="form-section">
        <h1 style={{ textAlign: "center" }}>Agregar una nueva division</h1>
        <FormularioDatos />
      </div>
      <div className="list-section">
        <h1 style={{ textAlign: "center" }}>Consulta de Divisiones</h1>
        <Lista />
      </div>
    </div>
  );
}

export default Division;
