import { useRef, useState, useEffect } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import styles from "./Testpage.module.css";

const testRecorder = new MicRecorder({
  bitRate: 128,
});

const stopTestRecording = async () => {
  return testRecorder
    .stop()
    .getMp3()
    .then(([buffer, blob]) => blob);
};

const Testpage = ({}) => {
  const [state, setState] = useState({ welcome: true });
  const audioRef = useRef();

  const startRecording = () => {
    audioRef.current?.pause();
    testRecorder.start();
    setState({ recording: true, t: 0 });
  };

  const end = async () => {
    const blob = await stopTestRecording();
    const _url = URL.createObjectURL(blob);
    audioRef.current = new Audio(_url);
    const playtest = () => {
      audioRef.current.play();
      setState({ ready: true, blob: "yes", playing: true, t: 0 });
    };
    audioRef.current.addEventListener("canplaythrough", playtest, false);
    setState({ ready: true, blob: "yes" });
  };

  useEffect(() => {
    // catch end of audio playback
    if (!audioRef.current) return;
    const ended = () => {
      setState({ ...state, playing: false });
    };
    audioRef.current.addEventListener("ended", ended, false);
    return () => {
      audioRef.current.removeEventListener("ended", ended);
    };
  }, [state, audioRef.current]);

  const stopAudio = () => {
    setState({ ...state, playing: false, t: 0 });
    audioRef.current.pause();
  };

  const replay = () => {
    audioRef.current.play();
    setState({ ...state, ready: true, playing: true, t: 0 });
  };

  // timer effect
  useEffect(() => {
    if (!state.recording && !state.playing) return;

    const timer = setTimeout(() => {
      if (state.t >= 9) end();
      setState({ ...state, t: state.t + 1 });
    }, 1000);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <div className={styles.container}>
      {state.welcome && (
        <div className={styles.welcome}>
          <p>You can check your audio before recording a message :</p>
          <button onClick={() => setState({ ready: true })}>Test Audio</button>
        </div>
      )}
      {state.ready && (
        <div>
          <p>Record a quick test message that will be played back to you</p>
          <div className={styles.row}>
            {!state.blob && (
              <button onClick={startRecording}>Start recording</button>
            )}
            {state.blob && (
              <>
                {state.playing ? (
                  <button onClick={stopAudio}>🔈 {state.t}s - stop</button>
                ) : (
                  <button onClick={replay}>replay</button>
                )}
                <button onClick={startRecording}>new recording</button>
              </>
              //  :
            )}
          </div>
        </div>
      )}
      {state.recording && (
        <div>
          <p>🔴 Recording test message ...</p>
          <button onClick={end}> {state.t}s &nbsp; stop</button>
        </div>
      )}
    </div>
  );
};

export default Testpage;
