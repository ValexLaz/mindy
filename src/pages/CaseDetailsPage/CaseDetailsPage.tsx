import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useSeguimiento } from "../../hooks/useSeguimiento";
import CrearSeguimientoForm from "../../components/Seguimiento/CrearSeguimientoForm";
import SeguimientoCard from "../../components/Seguimiento/SeguimientoCard";
import NotasForm from "../../components/Seguimiento/NotasForm";
import styles from "./CaseDetailsPage.module.css";

export default function CaseDetailsPage() {
  const { id_alerta } = useParams();
  const { seguimiento, loading, crear, actualizar, cerrar, load } =
    useSeguimiento(id_alerta);

  const [showForm, setShowForm] = useState(false);
  console.log("ID ALERTA DEL PARAM:", id_alerta);


  return (
    <Layout>
  <div className={styles.container}>
      <h1>Detalles del Caso</h1>

      {loading && <p>Cargando...</p>}

      {/* SI YA EXISTE SEGUIMIENTO */}
      {seguimiento && (
        <>
          <SeguimientoCard seguimiento={seguimiento} />

          <NotasForm
            defaultValue={seguimiento.notas}
            onSave={async (n) => {
              await actualizar(seguimiento.id_seguimiento, n);
              load();
            }}
          />

          <button className={styles.closeButton} onClick={async () => {
            await cerrar(seguimiento.id_seguimiento);
            load();
          }}>
            Cerrar caso
          </button>
        </>
      )}

      {/* SI NO EXISTE, MOSTRAR FORM */}
      {!seguimiento && (
        <>
          <button className={styles.createButton} onClick={() => setShowForm(!showForm)}>
            Crear seguimiento
          </button>

          {showForm && (
            <CrearSeguimientoForm
              onSubmit={async (plan) => {
                await crear(plan);
                setShowForm(false);
                load();
              }}
            />
          )}
        </>
      )}
     </div>
</Layout>
  );
}
