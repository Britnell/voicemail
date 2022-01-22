
import styles from './layout.module.css'

const Layout = ({children})=>(
    <>
        <main className={styles.container}>
            {children}
        </main>
    </>
)

export default Layout