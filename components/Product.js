import { useEffect } from 'react';
import styles from './Product.module.css'
import { useState } from 'react'

export default function Product({ name, description, imageUrl }) {
  const [count, setCount] = useState('loading...');

  const fetchCount = () =>
    fetch(`/api/products?name=${name}`)
      .then(res => res.json())
      .then(({ count }) => setCount(count))
      .catch(() => setCount("couldn't fetch count"))

  useEffect(() => {
    fetchCount();
  }, []);

  const addCount = () => {
    fetch(`/api/products?name=${name}`, { method: 'POST' })
      .then(fetchCount)
  };

  return (
    <>
      <div className={styles.product}>
        <img className={styles.product__image} src={imageUrl} />
        <h1 className={styles.product__name}>{name}</h1>
        <p className={styles.product__description}>{description}</p>
        <p className={styles.product__count}>count: {count}</p>
        <button onClick={addCount}>Add count</button>
      </div>
    </>
  )
}
