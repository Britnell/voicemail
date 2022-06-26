import Title from "../title";
import Text from "../text";
import Button from "../button";
import styles from "./record.module.css";

const Instructions = ({ start, back }) => {
  return (
    <>
      <div className={styles.pic}>[ lovely picture here ]</div>

      <div>
        <button onClick={start}>start</button>
        <button onClick={back}>back</button>
      </div>
    </>
  );
};

export default Instructions;
