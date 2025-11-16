// src/components/Matrices/CrearMatrizModal.tsx

import React, { useState } from "react";
import { crearMatriz } from "../../api/matricesService";

export default function CrearMatrizModal({ onClose }: { onClose: () => void }) {
  const [nombre, setNombre] = useState("");
  const [version, setVersion] = useState(1);

  // Campos del formulario
  const [bajoMin, setBajoMin] = useState(0);
  const [bajoMax, setBajoMax] = useState(0);

  const [medioMin, setMedioMin] = useState(0);
  const [medioMax, setMedioMax] = useState(0);

  const [altoMin, setAltoMin] = useState(0);
  const [altoMax, setAltoMax] = useState(0);

  const guardar = async () => {
    const configuracion = {
      umbrales: [
        { nivel: "bajo", min: Number(bajoMin), max: Number(bajoMax) },
        { nivel: "medio", min: Number(medioMin), max: Number(medioMax) },
        { nivel: "alto", min: Number(altoMin), max: Number(altoMax) },
      ],
    };

    await crearMatriz(nombre, configuracion, version);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Nueva Matriz</h3>

        <label>Nombre</label>
        <input
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label style={{ marginTop: "10px" }}>Versión</label>
        <input
          type="number"
          className="form-control"
          value={version}
          onChange={(e) => setVersion(parseInt(e.target.value))}
        />

        <h4 style={{ marginTop: "20px" }}>Reglas de clasificación</h4>

        {/* Nivel Bajo */}
        <div className="regla-box">
          <h5>Nivel Bajo</h5>
          <div className="row">
            <input
  type="number"
  placeholder="Min"
  value={bajoMin}
  onChange={(e) => setBajoMin(Number(e.target.value))}
  className="form-control"
/>

<input
  type="number"
  placeholder="Max"
  value={bajoMax}
  onChange={(e) => setBajoMax(Number(e.target.value))}
  className="form-control"
/>

          </div>
        </div>

        {/* Nivel Medio */}
        <div className="regla-box">
          <h5>Nivel Medio</h5>
          <div className="row">
            <input
              type="number"
              placeholder="Min"
              value={medioMin}
              onChange={(e) => setMedioMin(Number(e.target.value))}
              className="form-control"
            />
            <input
              type="number"
              placeholder="Max"
              value={medioMax}
              onChange={(e) => setMedioMax(Number(e.target.value))}
              className="form-control"
            />
          </div>
        </div>

        {/* Nivel Alto */}
        <div className="regla-box">
          <h5>Nivel Alto</h5>
          <div className="row">
            <input
              type="number"
              placeholder="Min"
              value={altoMin}
              onChange={(e) => setAltoMin(Number(e.target.value))}
              className="form-control"
            />
            <input
              type="number"
              placeholder="Max"
              value={altoMax}
              onChange={(e) => setAltoMax(Number(e.target.value))}
              className="form-control"
            />
          </div>
        </div>

        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-success" onClick={guardar}>
            Guardar
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
