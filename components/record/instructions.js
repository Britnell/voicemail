


import Title from "../title";
import Text from "../text";
import Button from "../button";

const Instructions = ({name,start})=>{
    
    return (
        <>
            <Title content="Maria & Massimo" />
            <Text content={`Hi ${name} you've reached the voicemail of Maria & Massimo. WE can't come to our phone right now - probably because we're getting married - please leave us a message after the BEEP`} />
            <div>
                <Button onClick={start} text="record" />
            </div>
        </>
    )
}

export default Instructions