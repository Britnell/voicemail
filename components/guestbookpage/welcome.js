

import Title from "../title";
import Text from "../text";
import Button from "../button";

const Welcome = ({next})=>(
    <div>
      <Title content="Voicemail" />
      <Text content="Benvenuti - the digital answering machine where you can leave a voice message for maria and massimo." />
      <div>
        <Button onClick={next} text="next" />
      </div>
      <Text content="Continua in italiano" />
      <Button onClick={next} text="vai" disabled />

    </div>
)

export default Welcome