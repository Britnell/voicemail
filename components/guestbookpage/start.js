

import Title from "../title";
import Text from "../text";
import Button from "../button";


const Start = ({next})=>(
    <div>
        <Title content="Maria & Massimo" />
        <Text content="Hello this is Maria & Massimo, we cant get to our phone right now so please leave us a message after the tone." />
        <div>
            <Button onClick={next} text="RECORD" />
        </div>
    </div>
)

export default Start