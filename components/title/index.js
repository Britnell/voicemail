
import cs from './title.module.css'


const Title = ({content})=>(
    <h1 className={cs.title}>{content}</h1>
)

export default Title