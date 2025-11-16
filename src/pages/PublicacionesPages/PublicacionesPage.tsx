import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { usePublicaciones } from "../../hooks/usePublicaciones";
import PublicacionCard from "../../components/Publicaciones/PublicacionCard";

export default function PublicacionesPage() {
  const { publicaciones, loading, eliminarP, load } = usePublicaciones();

  const handleDelete = async (id: string) => {
    const ok = confirm("¿Eliminar esta publicación?");
    if (!ok) return;
    await eliminarP(id);
    load();
  };

  if (loading) return <Layout>Cargando...</Layout>;

  return (
    <Layout>
      <h1>Publicaciones</h1>

      <Link to="/publicaciones/crear" className="btn btn-primary">
        Nueva publicación
      </Link>

      {Array.isArray(publicaciones) &&
  publicaciones.map((pub) => (

        <PublicacionCard
          key={pub.id_publicacion}
          pub={pub}
          onDelete={handleDelete}
        />
      ))}
    </Layout>
  );
}
