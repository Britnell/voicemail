import NotFound from "../../components/notfoundpage"
import Guestbook from "../../components/guestbookpage"

export default function Page(props){
  const {state, token} = props 

  console.log(props)
  
  return <div>Test</div>
  
  if(state=='NO_GB' || !token)
    return <NotFound />
  
  return (<Guestbook token={token} />)
}


export async function getServerSideProps(context) {

  return {
    props: {
      context: context.query,
      env: process.env,
    }
  }

  const id = context.query.id
  let guestbook = process.env['GUESTBOOK'].split(':')

  // NO GUESTBOOK
  if(guestbook[0]!==id || context.query.pass!==guestbook[1])
    return {
      props: {
        state: 'NO_GB'
      }
    }

    let token = process.env['DROPBOX_TOKEN']
  // console.log(' get server? ',guestbooks, gbid )

  return {
    props: {
      state: id,
      token, 
    }, 
  }

}
  