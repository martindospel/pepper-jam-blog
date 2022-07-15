import React from 'react';
import { fetchOneProduct, fetchProducts } from '../../util/productsFetcher';
import { useState, useEffect } from 'react'

function ProductPage({ product }) {
  const [count, setCount] = useState('loading...');

  const fetchCount = () => {
    fetch(`/api/products?name=${product.productName}`)
      .then(res => res.json())
      .then(({ count }) => setCount(count))
      .catch(() => setCount("couldn't fetch count"))
  }

  const buyProduct = () => {
    fetch(`/api/products?name=${product.productName}`, { method: 'POST' })
      .then(fetchCount)
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <div className="product-page">
      <div className="product-card">
        <div className="product-header">
          <h1>{product.productName}</h1>
          <button onClick={buyProduct}>Buy</button>
        </div>
        <h4 className="product-description">{product.productDescription}</h4>
        <p className="product-count">Remaining in stock: {count}</p>
        <img
          className="product-image"
          src={product.productImage.fields.file.url}
          alt={product.productImage.fields.description} />
      </div>
    </div>
  )
}


export async function getStaticProps(context) {
  const res = await fetchOneProduct(context.params.productId);
  const product = { ...res.fields, id: res.sys.id }

  return {
    props: {
      product,
    },
  }
}

export async function getStaticPaths() {
  const res = await fetchProducts();
  const paths = res.map(entry => ({ params: { productId: entry.sys.id } }));
  return {
    paths, fallback: false
  }
}

export default ProductPage