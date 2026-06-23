import { Outlet } from "react-router-dom"
import styles from "./Dashboard.module.scss"
import Header from "../Header/Header"

const Dashboard = () => {
  return (
    <div className={styles.Dashboard}>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Dashboard;