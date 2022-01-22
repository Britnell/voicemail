


export default function Page(props){
    console.log(props)
    
    return <div>Test page</div>
  }
  
  
  export async function getServerSideProps(context) {
    return {
        props: {
            test: context.query,
        }
    }

  }
    