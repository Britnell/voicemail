import PasswordPage from "../../components/password"
import NotFound from "../../components/notfoundpage"
import Guestbook from "../../components/guestbookpage"

export default function Page({state, token}){
  if(state=='NO_GB' || !token)
    return <NotFound />
  
  return (<Guestbook token={token} />)
}


export async function getServerSideProps(context) {
  const gbid = context.query.gbid
  let guestbook = process.env['GUESTBOOK'].split(':')

  // NO GUESTBOOK
  if(guestbook[0]!==gbid || context.query.pass!==guestbook[1])
    return {
      props: {
        state: 'NO_GB'
      }
    }

    let token = process.env['DROPBOX_TOKEN']
  // console.log(' get server? ',guestbooks, gbid )

  return {
    props: {
      state: gbid,
      token, 
    }, 
  }
}
  