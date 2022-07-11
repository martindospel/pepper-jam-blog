import styles from './Product.module.css'

export default function Product({ name, description, imageUrl }) {
  return (
    <>
      <div className={styles.product}>
        <img className={styles.product__image} src={imageUrl} />
        <h1 className={styles.product__name}>{name}</h1>
        <p className={styles.product__description}>{description}</p>
      </div>
    </>
  )
}
