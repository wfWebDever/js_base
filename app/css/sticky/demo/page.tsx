import styles from './style.module.css'

export default function StickyDemo() {
  return (
    <div>
      <div className={styles.sticky}>sticky header</div>
      <div className={styles.banner}>banner</div>

      <section className={styles.section1}>content</section>
      <section className={styles.section2}>content2</section>
      <section className={styles.end}>End</section>
    </div>
  )
}
