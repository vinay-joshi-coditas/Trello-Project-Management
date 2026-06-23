import styles from "./Table.module.scss"
import type { TableProps } from "./Table.types"

const Table = ({ children, className, ...props}:TableProps) => {
  return (
    <table className={[styles.Table, className].join(" ")} {...props}>{children}</table>
  )
}

export default Table;