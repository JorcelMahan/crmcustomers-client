import Layout from '../components/Layout';
import Product from '../components/Product';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../gql/product';
import Link from 'next/link';

const Products = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-light'>Products</h1>
        <Link
          href='/newproduct'
          className='bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold'
        >
          New Product
        </Link>
        <table className='table-auto shadow-md mt-10 w-full w-lg'>
          <thead className='bg-gray-800'>
            <tr className='text-white'>
              <th className='w-1/5 py-2'>Name</th>
              <th className='w-1/5 py-2'>Stock</th>
              <th className='w-1/5 py-2'>Price</th>
              <th className='w-1/5 py-2'>Delete</th>
              <th className='w-1/5 py-2'>Edit</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {data.getProducts.map(product => (
              <Product key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default Products;
