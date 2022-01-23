
import Title from "../title";
import Text from "../text";
import Button from "../button";


const Name = ({name,setName,next})=>{

  const submit = (ev)=>{
    ev.preventDefault()
    next({});
  }

  return (
    <div>
      <Title content="Maria & Massimo" />
      <Text content="Ciao Ragazzi" />
      <Text content="Thank you for coming - We are so happy to be sharing this day with you." />
      <Text content="Here you can leave us a voice message to remember. " />
      <Text content="Leave an individual message or record a group message" />

      <div>
        <p>Please leave a name so we know who the message is from</p>
        <form onSubmit={submit}>
          <input type="text" value={name} onChange={ev=>setName(ev.target.value)} />
          <Button type="submit" text="enter" />
        </form>
      </div>

    </div>)
}

export default Name