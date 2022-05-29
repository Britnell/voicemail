import { useRef, useState, useEffect } from "react";
import Title from "../title";
import Text from "../text";
import Button from "../button";
import useRecorder from "../record/audio";

const Testpage = ({ back, token }) => {
  const [state, setState] = useState({ ready: true });
  const recorder = useRecorder({ token });
  const audioRef = useRef();

  const start = () => {
    recorder.start();
    setState({ recording: true, t: 0 });
  };

  const end = async () => {
    const blob = await recorder.test();
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

  const replay = () => {
    audioRef.current.play();
    setState({ ...state, ready: true, playing: true, t: 0 });
  };

  // timer effect
  useEffect(() => {
    if (!state.recording && !state.playing) return;

    const timer = setTimeout(() => {
      //   console.log("set", state);
      setState({ ...state, t: state.t + 1 });
    }, 1000);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <div>
      <Title content="Voicemail" />
      <Text content="Test your audio here. Record a message and listen back to it : " />

      {state.ready && (
        <div>
          {state.blob && (
            <div>
              {state.playing && <Text content={`${state.t}`} />}
              <Button
                text={state.playing ? "stop" : "replay"}
                onClick={replay}
              />
            </div>
          )}
          <div>
            <Button
              text={state.blob ? "new recording" : "Start recording"}
              onClick={start}
            />
          </div>
        </div>
      )}
      {state.recording && (
        <div>
          <Text content="Recording ..." />
          <Text content={`🔴 - ${state.t}  Recording ...`} />
          <Button text="end" onClick={end} />
        </div>
      )}

      <div>
        <Button text="Back" onClick={back} />
      </div>
    </div>
  );
};

export default Testpage;
