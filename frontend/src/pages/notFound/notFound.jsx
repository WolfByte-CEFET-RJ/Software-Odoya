import styles from './notFound.module.scss'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
    <img
        src="/LogoAzul.svg"
        className={styles.logoazul}
        alt="Logo Azul da ENACTUS"
    />
    <h1>404</h1>
    <h2>Página não encontrada</h2>
    <Link to="/">
        <h3>Voltar para Home</h3>
    </Link>
    </div>

  )
}

export default NotFound
