// src/pages/Matrices/MatricesPage.tsx
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useMatrices } from "../../hooks/useMatrices";
import MatrizCard from "../../components/Matrices/MatrizCard";
import CrearMatrizModal from "../../components/Matrices/CrearMatrizModal";

export default function MatricesPage() {
  const { matrices, loading } = useMatrices();
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <h1>Matrices dinámicas</h1>

      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Crear matriz
      </button>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        matrices.map((m) => <MatrizCard matriz={m} key={m.id_matriz} />)
      )}

      {showModal && <CrearMatrizModal onClose={() => setShowModal(false)} />}
    </Layout>
  );
}
