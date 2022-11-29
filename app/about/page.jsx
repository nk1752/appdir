import Image from 'next/image'
import Link from 'next/link';
import styles from './page.module.css'

function About() {
  return (
    <div className={styles.container}>
      
      <main className={styles.main}>
        
        <h1 className={styles.title}>
          Back to <Link href="/">Home Page</Link>
        </h1>
        
      </main>

    </div>
  )
}

export default About;
