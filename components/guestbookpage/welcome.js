import Title from "../title";
import Text from "../text";
import Button from "../button";

const Welcome = ({ next }) => {
  const click = async () => {
    // const permission = await navigator.permissions.query({
    //   name: "microphone",
    // });
    // console.log(" mic : ", permission);

    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then(() => {
        console.log(" allowed  ");
        next({ goto: "record" });
      })
      .catch((err) => {
        next({ goto: "permission" });
      });
  };
  return (
    <div>
      <Title content="Voicemail" />
      <Text content="Benvenuti - the digital answering machine where you can leave a voice message for maria and massimo." />
      <div>
        <Button onClick={click} text="next" />
      </div>
      <Text content="Continua in italiano" />
      <Button onClick={click} text="vai" disabled />
    </div>
  );
};

export default Welcome;
