import React, { useState } from "react";
import { usePreguntas } from "../../hooks/usePreguntas";
import PreguntaListCard from "../../components/Preguntas/PreguntaListCard";
import EditarPreguntaModal from "../../components/Preguntas/EditarPreguntaModal";
import EditarRespuestasModal from "../../components/Preguntas/EditarRespuestasModal";
import type { Pregunta } from "../../api/preguntasService";

export default function PreguntasListPage() {
  const { preguntas, loading, actualizar, eliminar } = usePreguntas();

  const [preguntaEditando, setPreguntaEditando] = useState<Pregunta | null>(null);
  const [preguntaEditandoRespuestas, setPreguntaEditandoRespuestas] = useState<Pregunta | null>(null);

  if (loading) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Preguntas registradas</h2>

      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "1fr 1fr" }}>
        {preguntas.map((p) => (
          <PreguntaListCard
            key={p.id_pregunta}
            pregunta={p}
            onEdit={(preg) => setPreguntaEditando(preg)}
            onDelete={eliminar}
            onEditRespuestas={(preg) => setPreguntaEditandoRespuestas(preg)}
          />
        ))}
      </div>

      {/* Modal de editar pregunta */}
      {preguntaEditando && (
        <EditarPreguntaModal
          pregunta={preguntaEditando}
          onClose={() => setPreguntaEditando(null)}
          onSave={async (data) => {
            await actualizar(preguntaEditando.id_pregunta, data);
            setPreguntaEditando(null);
          }}
        />
      )}

      {/* Modal de editar respuestas */}
      {preguntaEditandoRespuestas && (
        <EditarRespuestasModal
          pregunta={preguntaEditandoRespuestas}
          onClose={() => setPreguntaEditandoRespuestas(null)}
        />
      )}
    </div>
  );
}
