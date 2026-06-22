import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.Sidebar}>
        <div className={styles.Container1}>
            <div className={styles.Logo}>
                <h2>KanBan Board</h2>
            </div>
            <div className={styles.ProjectsContainer}>
                <div className={styles.Projects}>
                    <h3>Projects:</h3>
                    <ul>
                        <li>abc-app</li>
                        <li>xyz-app</li>
                        <li>pqr-app</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className={styles.Container2}>
            <div className={styles.Roles}>
                <h2>Roles</h2>
            </div>
            <div className={styles.Profile}>
                <h2>Profile</h2>
            </div>
        </div>
    </div>
  )
}

export default Sidebar