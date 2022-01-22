import cn from './text.module.css'

const Text = ({content})=>{
    return <p className={cn.text}>{content}</p>
}

export default Text