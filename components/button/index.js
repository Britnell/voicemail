
import cn from './button.module.css'


const Button = ({onClick,text})=><button className={cn.button}  onClick={onClick}>{text}</button>

export default Button