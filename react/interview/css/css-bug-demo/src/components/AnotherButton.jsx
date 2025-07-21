import styles from "./another-button.module.css";
console.log(styles);
const AnotherButton = () => {
  return <button className={styles.button}>Another Button</button>;
};

export default AnotherButton;
