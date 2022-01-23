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

    const start = ()=>{
        return recorder.start()
    }

    const stop = ()=>{
        return recorder.stop().getMp3()
            .then(([buffer, blob])=>convert([buffer, blob]))
            .then(file=> upload(file) )
    }

    const convert = ([buffer, blob]) => {
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

        return db.filesUpload({path: '/' + file.name, contents: file})  // Apps/Voicemail/
    }


    return { start, stop, } 

}


export default useRecorder