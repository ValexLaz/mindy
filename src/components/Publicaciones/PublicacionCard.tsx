import styles from "./PublicacionCard.module.css";
import { Link } from "react-router-dom";

interface Props {
  pub: any;
  onDelete: (id: string) => void;
}

export default function PublicacionCard({ pub, onDelete }: Props) {
  return (
    <div className={styles.card}>
      {pub.imagen_url && (
        <img src={pub.imagen_url} className={styles.image} />
      )}

      <h3 className={styles.title}>{pub.titulo}</h3>
      <p className={styles.preview}>{pub.contenido.substring(0, 100)}...</p>

      <div className={styles.actions}>
        <Link
          to={`/publicaciones/editar/${pub.id_publicacion}`}
          className={styles.edit}
        >
          Editar
        </Link>

        <button
          onClick={() => onDelete(pub.id_publicacion)}
          className={styles.delete}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
