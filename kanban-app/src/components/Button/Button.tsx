import type { ButtonProps } from "./Button.types"
import styles from "./Button.module.scss"

export const PrimaryBtn = ({  className, children, ...props } : ButtonProps) => {
  return (
    <button className={[styles.PrimaryBtn, className].join(" ")} {...props}> {children} </button>
  )
}

export const SecondaryBtn = ({ className, children, ...props } : ButtonProps) => {
  return (
    <button className={[styles.SecondaryBtn, className].join(" ")} {...props}> {children} </button>
  )
}
