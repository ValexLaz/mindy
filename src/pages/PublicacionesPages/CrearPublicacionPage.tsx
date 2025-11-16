import Layout from "../../components/Layout/Layout";
import PublicacionForm from "../../components/Publicaciones/PublicacionForm";
import { useNavigate } from "react-router-dom";
import { usePublicaciones } from "../../hooks/usePublicaciones";

export default function CrearPublicacionPage() {
  const { crear } = usePublicaciones();
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    await crear(data);
    navigate("/publicaciones");
  };

  return (
    <Layout>
      <h1>Nueva publicación</h1>
      <PublicacionForm onSubmit={handleSubmit} />
    </Layout>
  );
}
