import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center text-center g-1">
          <div className="col-12 col-md-auto">
            <span>Yousay.fun © 2026</span>
          </div>
          <div className={`col-auto d-none d-md-block ${styles.sep}`}>·</div>
          <div className="col-12 col-md-auto">
            <a href="mailto:info@yousay.fun" className={styles.link}>
              info@yousay.fun
            </a>
          </div>
          <div className={`col-auto d-none d-md-block ${styles.sep}`}>·</div>
          <div className="col-12 col-md-auto">
            <a href="tel:+50686053702" className={styles.link}>
              +506 8605 3702
            </a>
          </div>
          <div className={`col-auto d-none d-md-block ${styles.sep}`}>·</div>
          <div className="col-12 col-md-auto">
            <span>Leonardo Deliyore, San José - Costa Rica</span>
          </div>
        </div>
      </div>
    </footer>
  )
}