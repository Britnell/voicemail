
import Link from 'next/link'
import { useRouter } from 'next/router'

const GuestbookSearch = ()=>{
    const router = useRouter()

    const search = (ev)=>{
        let name = ev.target.name.value
        router.push(`/guestbook/${name}`)
        ev.preventDefault();
      }

    return (
        <div>
            <form onSubmit={search}>
            <label>Enter the name here</label>
            <input type="text" name="name" >...</input>
            <input type="submit" value="Search" />
        </form>
        </div>
    )
}

export default GuestbookSearch