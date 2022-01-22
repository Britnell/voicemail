import {  useState } from 'react';

import {Dropbox} from 'dropbox'
import MicRecorder from 'mic-recorder-to-mp3'

const recorder = new MicRecorder({
    bitRate: 128
});
const sizelimit = 150 * 1024 * 1024


const timestamp = ()=>{
    let str = ''
    const d = new Date()

    let iso = d.toISOString().replaceAll('-','_')
    str += iso.slice(0,iso.indexOf('T')+1)
    let t = d.toLocaleTimeString().replaceAll(':','_')
    str += t
    return str;
}


// * * * * * * ** 



const useRecorder = ({name,token})=>{
    const [db] = useState(()=> new Dropbox({ accessToken: token }) )

    console.log(token,db)

    const start = ()=>{
        return recorder.start()
            .catch(e=>{
                console.log(' recording error, ', e)
            })
    }

    const stop = ()=>{
        return recorder.stop().getMp3()
            .then(([buffer, blob])=>convert([buffer, blob]))
            .then(file=> upload(file) )
    }

    const convert = ([buffer, blob]) => {
        // console.log(' [mp3] : ',buffer, blob);
        const FNAME = `${name}_${timestamp()}.mp3`
        const file = new File(buffer, FNAME, {
          type: blob.type,
          lastModified: Date.now()
        });
        return file;
    }

    const upload = (file)=>{

        if(file.size>=sizelimit)
            throw new Error(' Upload error, file too big ')

        return db.filesUpload({path: '/Apps/tbdbtest/' + file.name, contents: file})
    }


    return { start, stop, }

    // .then(function(response) {
    //     console.log(' done ', response)
    //     buttonRef.current.textContent = 'Start'
    //     buttonRef.current.disabled = 'false'
    //     setRecordState('ready')
    //   })

    const click = ()=>{
        if(recordState==='ready'){
            // START
            buttonRef.current.textContent = 'STOP'
            console.log(buttonRef.current)
            start()
            setRecordState('recording')
        }
        else if(recordState==='recording'){
            buttonRef.current.textContent = 'SAVING'
            buttonRef.current.disabled = 'true'
            stop()
            setRecordState('saving')
        }
        // Eo click
    }
    return (
        <div>
            <div>
                To start recording press here:
            </div>
            <div>
                State : {recordState}
            </div>
            <div>
                <label>RECORD </label>
                <div>
                    <button ref={buttonRef} onClick={click} >START</button>
                </div>
            </div>

            <div>
                <div>Messages sent :</div>
                <div>{JSON.stringify(messages)}</div>
            </div>        
        </div>
    )
}


export default useRecorder