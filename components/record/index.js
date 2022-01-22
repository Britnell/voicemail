
import { useRef, useState } from 'react';

import Instructions from './instructions';


import Title from "../title";
import Text from "../text";
import Counter from './counter';

import useRecorder from './audio';



function Record({name,token}){
    const [state,setState] = useState('ready')
    const recorder = useRecorder({name,token})

    const startRecording = async ()=>{
        await recorder.start()
        console.log('recording started ')
        setState('record')
    }

    const endRecording = async ()=>{
        setState('saving')
        recorder.stop()
        .then(res=>{
            setState('saved')
            console.log(' Recorder - res : ',res)
        })
        .catch(e=>{
            setState('error')
            console.log(' erorr saving / uploadig ', e )
        })
    }

    const newMessage = ()=>setState('ready')

    if(state==='ready') 
        return <Instructions name={name} start={startRecording} />
    
    if(state==='record')
        return (
            <div>
                <Title content="Maria & Massimo" />
                <Text content="🔴 Recording" />
                <Counter />
                <div>
                    <Button onClick={endRecording} text="end" />
                </div>
            </div>
        )

    if(state==='saving')
        return (
            <div>
                <Title content="Maria & Massimo" />
                <Text content="saving message" />
                <div>..... (spinner) </div>
            </div>
        )
    
    if(state==='saved')
        return (
            <div>
                <Title content="Maria & Massimo" />
                <Text content="Success 🥳" />
                <Text content={`Dear ${name} - Thank you so much for your message`} />
                <Text content="👰🏻🤵🏻‍♂️" />
                


                <Text content="To leave another message, please click here" />
                <div>
                    <Button onClick={newMessage} text="new" />
                </div>
            </div>
        )
    
    if(state==='error')
        return (
            <div>
                <Title content="Maria & Massimo" />
                <Text content="ERROR" />
                <Text content="Unfortunately somethign went wrong" />
                <Text content="Please refresh the page and try again" />
                <div>
                    <Button onClick={newMessage} text="new" />
                </div>
            </div>
        )
}


export default Record