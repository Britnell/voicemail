import { useState } from "react";

import { Dropbox } from "dropbox";
import MicRecorder from "mic-recorder-to-mp3";

const recorder = new MicRecorder({
  bitRate: 128,
});
const sizelimit = 150 * 1024 * 1024;

const timestamp = () => {
  const d = new Date();
  const date = d.toISOString().split("T")[0];
  const time = d.toLocaleTimeString().slice(0, 5);
  const mills = d.getMilliseconds();
  return `${date}_${time}_${mills}`;
};

// * * * * * * **

const useRecorder = ({ token }) => {
  const [db] = useState(() => new Dropbox({ accessToken: token }));

  const start = () => {
    return recorder.start();
  };

  const test = async () => {
    return recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => blob);
  };

  const stop = () =>
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => convert([buffer, blob]))
      .then((file) => upload(file));

  const convert = ([buffer, blob]) => {
    const FNAME = `${timestamp()}.mp3`;
    const file = new File(buffer, FNAME, {
      type: blob.type,
      lastModified: Date.now(),
    });
    return file;
  };

  const upload = (file) => {
    if (file.size >= sizelimit) throw new Error(" Upload error, file too big ");

    return db.filesUpload({ path: "/" + file.name, contents: file }); // Apps/Voicemail/
  };

  return { start, stop, test };
};

export default useRecorder;
