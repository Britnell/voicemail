import Testpage from "../testpage/Testpage";
import Header from "../header";
import styles from "./Welcome.module.css";

const Welcome = ({ next, token }) => {
  const click = async () => {
    // const permission = await navigator.permissions.query({
    //   name: "microphone",
    // });
    // console.log(" mic : ", permission);

    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then(() => {
        next({ goto: "record" });
      })
      .catch((err) => {
        next({ goto: "permission" });
      });
  };
  return (
    <div>
      <Header title="Benvenuti" />
      <div className={styles.title}>
        <h2>
          <span className={styles.welcome}>Добро Пожаловать</span>
          <span className={styles.welcome}>Welcome</span>
        </h2>
      </div>
      <main className={styles.main}>
        <p>You have reached the online answering-machine of</p>
        <h3>Maria and Massimo</h3>
        <p>Record a voice note to leave them a personal message.</p>

        <footer>
          <span className="moji">🗣️📞</span>
          <button onClick={click}>Next</button>
        </footer>
        <Testpage token={token} />
      </main>
    </div>
  );
};

export default Welcome;
