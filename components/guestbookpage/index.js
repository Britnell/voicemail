import next from "next";
import { useState } from "react"
import Record from "../record";

import Welcome from "./welcome";
import Name from "./name";
import Start from "./start";


function Guestbook({token}){

  const [state,setState] = useState({
    page:'welcome',
    lang: 'en',
    name: '',
  })
  const {page} = state

  const next = ({ lang })=>{
    if(page==='welcome'){
      setState({
        page: 'name', 
        lang: lang || 'en',
      })
    }
    else if(page==='name'){
      setState({
        ...state, page: 'record',
      })
    }
  }

  if(page==='welcome')
    return <Welcome next={next} />

  if(page==='name')
    return <Name 
      name={state.name} 
      setName={(name)=>setState({...state,name})} 
      next={next}
    />

  if(page==='record')
    return <Record name={state.name} token={token} />

  return <div>Error xxx</div>
}

  
  export default Guestbook