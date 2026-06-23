import type { TableRowProps } from './TableRow.types'
import styles from "./TableRow.module.scss";

const TableRow = ({ children, className, ...props}: TableRowProps) => {
  return (
    <tr className={[styles.TableRow, className].join(" ")} {...props}>{children}</tr>
  )
}

export default TableRow;