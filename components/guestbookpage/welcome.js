import Title from "../title";
import Text from "../text";
import Button from "../button";
import Testpage from "../testpage/Testpage";

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
      <Title content="Voicemail" />
      <Text content="Benvenuti - the digital answering machine where you can leave a voice message for maria and massimo." />
      <div>
        <Button onClick={click} text="next" />
      </div>
      <div>
        <Testpage token={token} />
      </div>
    </div>
  );
};

export default Welcome;
