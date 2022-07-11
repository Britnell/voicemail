import { useEffect, useRef, useState } from "react";

import Counter from "./counter";
import useRecorder from "./audio";
import Header from "../header";

import styles from "./Record.module.css";

function Record({ token, back }) {
  const [state, setState] = useState("ready");
  const recorder = useRecorder({ token });
  const audioIntro = useRef();

  useEffect(() => {
    audioIntro.current = new Audio("/mnm_record.mp3");

    const onEnd = () => {
      startRecording();
    };
    audioIntro.current.addEventListener("ended", onEnd);

    return () => audioIntro.current.removeEventListener("ended", onEnd);
  }, []);

  const playIntro = () => {
    setState("intro");
    audioIntro.current.play();
  };

  const startRecording = async () =>
    recorder
      .start()
      .then(() => {
        setState("record");
      })
      .catch((e) => console.log(" recording error ... "));

  const endRecording = async () => {
    setState("saving");
    recorder
      .stop()
      .then((res) => {
        setState("saved");
      })
      .catch((e) => {
        setState("error");
      });
  };

  const newMessage = () => setState("ready");

  let page;

  return (
    <div>
      <Header title="Maria & Massimo" />
      <div className={styles.photo}>
        <img src="/asset/display/QNP34YLK4R4T.jpg" alt="wedding photo" />
      </div>
      <div className={styles.content}>
        {(state === "ready" || state === "intro") && (
          <>
            <h4>Ready to leave a message</h4>
            <p className={styles.instruct}>
              Please turn on your audio <span className="moji">🔈</span>
            </p>
            <div className={styles.reminder}>
                <p>
                  On Smartphone please keep your finger on the screen to keep your phone unlocked.
                </p>
              </div>
          </>
        )}
        {state === "record" && (
          <>
            <h4>🔴 Recording</h4>
            <p className={styles.instruct + " " + styles.counter}>
              <Counter />
            </p>
          </>
        )}
        {state === "saving" && (
          <div>
            <h4 className={styles.instruct}>saving message </h4>
            <h4 className={styles.saving}>..........................</h4>
          </div>
        )}
        {state === "saved" && (
          <div>
            <h4>Success 🥳</h4>
            <p>Thank you so much for your message</p>
            <p className={styles.instruct}>
              <span className="moji">👰🏻🤵🏻‍♂️</span>
            </p>

            <p>Feel free to leave another message! </p>
          </div>
        )}
        {state === "error" && (
          <div>
            <p>ERROR</p>
            <p>Unfortunately somethign went wrong</p>
            <p>Please refresh the page and try again</p>
            <div>
              <button onClick={newMessage}>new</button>
            </div>
          </div>
        )}
      </div>
      {/* Footer Buttons  */}
      <div className={styles.footer}>
        {state === "ready" && <button onClick={playIntro}>start</button>}
        {state === "intro" && (
          <button>
            ( intro ) <span className="moji"> 🔈</span>
          </button>
        )}
        {state === "record" && (
          <>
            <button onClick={endRecording}>Finish</button>
          </>
        )}
        {state === "saved" && <button onClick={newMessage}>Again</button>}
      </div>
      {state === "ready" && (
        <div className={styles.back}>
          <button onClick={back}>back</button>
        </div>
      )}
      {page}
    </div>
  );
}

export default Record;
