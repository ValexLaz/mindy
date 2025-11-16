import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useCategorias } from "../../hooks/useCategorias";
import { usePreguntas } from "../../hooks/usePreguntas";
import styles from "./ConfiguracionPreguntasPage.module.css";
import RespuestaForm from "../../components/Preguntas/RespuestaForm";
import { crearRespuesta } from "../../api/preguntasService";

export default function ConfiguracionPreguntasPage() {
  const { categorias, crear: crearCategoria } = useCategorias();
  const { crear: crearPregunta } = usePreguntas();

  // Estado del formulario de categorías
  const [nombreCat, setNombreCat] = useState("");
  const [descCat, setDescCat] = useState("");

  // Estado del formulario de preguntas
  const [idCategoria, setIdCategoria] = useState("");
  const [textoPregunta, setTextoPregunta] = useState("");
  const [isOpen, setIsOpen] = useState(false);
const [preguntaCreada, setPreguntaCreada] = useState<any>(null);
const [mostrarModal, setMostrarModal] = useState(false);
  const handleCrearCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreCat.trim()) return;

    await crearCategoria(nombreCat, descCat);
    setNombreCat("");
    setDescCat("");
  };

  const handleCrearPregunta = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!textoPregunta || !idCategoria) return;

 const nueva = await crearPregunta(idCategoria, textoPregunta, isOpen);
console.log("Pregunta creada:", nueva); // úsalo para probar

if (!isOpen) {
  setPreguntaCreada(nueva);
  setMostrarModal(true);
}

};

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Configuración de Preguntas y Categorías</h1>

        {/* === CREAR CATEGORÍA === */}
        <section className={styles.card}>
          <h2>Crear Categoría</h2>
          <form onSubmit={handleCrearCategoria} className={styles.form}>
            <label>Nombre de categoría</label>
            <input
              value={nombreCat}
              onChange={(e) => setNombreCat(e.target.value)}
            />

            <label>Descripción</label>
            <textarea
              value={descCat}
              onChange={(e) => setDescCat(e.target.value)}
            />

            <button type="submit">Guardar categoría</button>
          </form>
        </section>

        {/* === CREAR PREGUNTA === */}
        <section className={styles.card}>
          <h2>Crear Pregunta</h2>
          <form onSubmit={handleCrearPregunta} className={styles.form}>
            <label>Categoría</label>
            <select value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)}>
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id_categoria} value={cat.id_categoria}>
                  {cat.nombre}
                </option>
              ))}
            </select>

            <label>Texto de pregunta</label>
            <textarea
              value={textoPregunta}
              onChange={(e) => setTextoPregunta(e.target.value)}
            />

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={isOpen}
                onChange={(e) => setIsOpen(e.target.checked)}
              />
              Pregunta abierta
            </label>

            <button type="submit">Guardar pregunta</button>
          </form>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Link
                to="/preguntas/listado"
                style={{
                background: "#1abc9c",
                padding: "10px 20px",
                borderRadius: "8px",
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
                display: "inline-block",
                }}
            >
                Ver preguntas registradas
            </Link>
            </div>

        </section>
        {/* === BOTONES PARA MATRICES DINÁMICAS === */}
<div style={{ marginTop: "30px", textAlign: "center" }}>
  <h3 style={{ marginBottom: "15px" }}>Matrices dinámicas</h3>

  <Link
    to="/matrices"
    style={{
      background: "#3498db",
      padding: "10px 20px",
      borderRadius: "8px",
      color: "white",
      textDecoration: "none",
      fontWeight: "bold",
      display: "inline-block",
      marginRight: "10px",
    }}
  >
    Ver matrices
  </Link>

  <Link
    to="/matrices/crear"
    style={{
      background: "#9b59b6",
      padding: "10px 20px",
      borderRadius: "8px",
      color: "white",
      textDecoration: "none",
      fontWeight: "bold",
      display: "inline-block",
    }}
  >
    Crear matriz
  </Link>
</div>

        {/* === LISTADO DE CATEGORÍAS === */}
        <section className={styles.card}>
          <h2>Categorías existentes</h2>
          {categorias.length === 0 ? (
            <p>No hay categorías registradas.</p>
          ) : (
            <ul className={styles.list}>
              {categorias.map((c) => (
                <li key={c.id_categoria}>{c.nombre}</li>
              ))}
            </ul>
          )}
        </section>
      </div>
      {/* === MODAL DE RESPUESTAS === */}
      {mostrarModal && preguntaCreada && (
        <RespuestaForm
          preguntaTexto={preguntaCreada.texto}
          onAdd={async (texto, peso) => {
            await crearRespuesta(preguntaCreada.id_pregunta, texto, peso);
          }}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </Layout>
  );
}
