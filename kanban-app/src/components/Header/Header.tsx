import styles from "./Header.module.scss"

const Header = () => {
  return (
    <>
        <div className={styles.Header}>
            <div className={styles.Logo}>
                <h2>Kanban Board</h2>
            </div>
        </div>
    </>
  )
}

export default Header