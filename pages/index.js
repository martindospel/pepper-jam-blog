import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { fetchProducts } from 'util/productsFetcher'
import Product from '@components/Product'

export default function Home({ products }) {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Products Page" />
        <div className="products_container" style={{ display: 'flex', gap: '20px' }}>
          {products.map(product => <Product
            key={product.productName}
            name={product.productName}
            description={product.productDescription}
            imageUrl={product.productImage.fields.file.url}></Product>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetchProducts();
  const products = res.map((p) => {
    return p.fields
  });

  return {
    props: {
      products,
    },
  }
}