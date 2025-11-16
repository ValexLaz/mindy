import Layout from "../../components/Layout/Layout";
import PublicacionForm from "../../components/Publicaciones/PublicacionForm";
import { useParams, useNavigate } from "react-router-dom";
import { usePublicaciones } from "../../hooks/usePublicaciones";

export default function EditarPublicacionPage() {
  const { id_publicacion } = useParams();
  const navigate = useNavigate();
  const { publicacion, loading, editar } = usePublicaciones(id_publicacion);

  const handleSubmit = async (data: any) => {
    await editar(data);
    navigate("/publicaciones");
  };

  if (loading) return <Layout>Cargando...</Layout>;

  return (
    <Layout>
      <h1>Editar publicación</h1>
      <PublicacionForm initialData={publicacion} onSubmit={handleSubmit} />
    </Layout>
  );
}
