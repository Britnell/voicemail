import React from 'react'
import Homepage from '../components/homepage'


const Home = (props) => {
  console.log(props)
  return <Homepage />
}

export default Home;



export async function getServerSideProps(context) {
  
  let guestbook = process.env['GUESTBOOK']
  let token = process.env['DROPBOX_TOKEN']

  return {
    props: {
      guestbook, token
    }, 
  }
}
  