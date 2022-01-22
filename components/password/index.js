import { useRouter } from 'next/router'

function PasswordPage(){
    const router = useRouter()

    const submit = (ev)=>{
        ev.preventDefault()
        let pw = ev.target.password.value
        let url = `/guestbook/${router.query.gbid}?password=${pw}`
        router.push(url)
    }
  
    return (
    <div>
      <h2>
        guestbook page - password protected
      </h2>
      <div>
        <p> please get the full invitaiton link for your guestbook</p>
        <p>, or enter the password here</p>
        <div>
          <form onSubmit={submit}>
            <input type="text" name="password" />
            <input type="submit" value="enter" />
          </form>
        </div>
      </div>
    </div>)
  }


  export default PasswordPage;