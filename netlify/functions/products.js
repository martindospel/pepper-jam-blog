const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

const uri = process.env.NEXT_PUBLIC_MONGO_DB_CONN_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

async function getProducts() {
  const dbClient = await client.connect()
  productCollection = dbClient.db("jam-blog").collection("products");
  return productCollection;
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'GET'
    && event.httpMethod !== 'POST') {
    return { statusCode: 404 };
  }
  const products = await getProducts();
  const prod = await products.findOne({ name: event.queryStringParameters?.name });
  if (event.httpMethod === 'GET') {
    return {
      statusCode: prod ? 200 : 403,
      body: prod ? JSON.stringify({
        name: prod?.name,
        count: prod?.count
      }) : JSON.stringify({
        message: 'No such product'
      }),
    }
  } else {
    await products.updateOne(prod, { $set: { count: prod.count + 1 } });
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Incremented'
      }),
    }
  }
}