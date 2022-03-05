import Title from "../title";
import Text from "../text";
import Button from "../button";
import styles from "./record.module.css";

const Instructions = ({ start }) => {
  return (
    <>
      <Title content="Maria & Massimo" />
      <div className={styles.pic}>[ lovely picture here ]</div>
      <Text content={""} />
      <div>
        <Button onClick={start} text="start" />
      </div>
    </>
  );
};

export default Instructions;
