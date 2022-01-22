import NotFound from "../../components/notfoundpage"
import Guestbook from "../../components/guestbookpage"

export default function Page(props){
  const {state, token} = props 

  console.log(props)
  
  if(state=='NO_GB' || !token)
    return <NotFound />
  
  return (<Guestbook token={token} />)
}


export async function getServerSideProps(context) {
  try {

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
  catch(error){
    return {
      props: {
        error
      }
    }
  }

}
  