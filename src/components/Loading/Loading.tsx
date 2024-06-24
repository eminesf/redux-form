import styles from "./Loading.module.scss";

export function Loading() {
  return (
    <div>
      <p>Loading</p>
      <div className={styles.loader}></div>
    </div>
  );
}
