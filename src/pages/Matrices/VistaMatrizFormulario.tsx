import React from "react";

export default function VistaMatrizFormulario({ config }: { config: any }) {
  if (!config || !config.umbrales) return <p>Sin configuración.</p>;

  const umbrales = config.umbrales;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Configuración de niveles</h3>

      {/* Bajo */}
      <div className="regla-box">
        <h4>Nivel Bajo</h4>
        <div className="row">
          <div>Min: {umbrales.bajo.min}</div>
          <div style={{ marginLeft: "15px" }}>Max: {umbrales.bajo.max}</div>
        </div>
      </div>

      {/* Medio */}
      <div className="regla-box">
        <h4>Nivel Medio</h4>
        <div className="row">
          <div>Min: {umbrales.medio.min}</div>
          <div style={{ marginLeft: "15px" }}>Max: {umbrales.medio.max}</div>
        </div>
      </div>

      {/* Alto */}
      <div className="regla-box">
        <h4>Nivel Alto</h4>
        <div className="row">
          <div>Min: {umbrales.alto.min}</div>
          <div style={{ marginLeft: "15px" }}>Max: {umbrales.alto.max}</div>
        </div>
      </div>
    </div>
  );
}
