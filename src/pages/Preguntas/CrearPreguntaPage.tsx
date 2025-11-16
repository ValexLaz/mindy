import React from "react";
import Layout from "../../components/Layout/Layout";
import { useCategorias } from "../../hooks/useCategorias";
import { usePreguntas } from "../../hooks/usePreguntas";
import PreguntaForm from "../../components/Preguntas/PreguntaForm";

export default function CrearPreguntaPage() {
  const { categorias } = useCategorias();
  const { crear } = usePreguntas();

  return (
    <Layout>
      <PreguntaForm categorias={categorias} onSubmit={crear} />
    </Layout>
  );
}
