import React, { useState } from "react"

const timestring = (count)=>{
    let m = count.min.toString()
    let s = count.sec.toString()
    if(s.length===1)
        s = '0'+s
    return `${m}:${s}`
}

const Counter = ()=>{
    const [count,setCount] = useState({sec:0,min:0})

    React.useEffect(()=>{
        setTimeout(()=>{
            let {min,sec} = count
            sec++;
            if(sec>=60){
                sec = 0;
                min++;
            }
            setCount({min,sec})
        },1000)
    },[count])

    return <div>{timestring(count)}</div>
}

export default Counter