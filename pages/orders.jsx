import Layout from '../components/Layout';
import Order from '../components/Order';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_ORDERS_SELLER } from '../gql/order';

const Orders = () => {
  const { data, loading, error } = useQuery(GET_ORDERS_SELLER);

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  const { getOrdersSeller } = data;

  return (
    <div>
      <Layout>
        <h1 className='text-2xl text-gray-800 font-light'>Orders</h1>

        <Link
          href='/neworder'
          className='bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold'
        >
          New Order
        </Link>

        {getOrdersSeller.length === 0 ? (
          <p className='mt-5 text-center text-2xl'>There are no orders yet</p>
        ) : (
          getOrdersSeller.map(order => <Order key={order.id} order={order} />)
        )}
      </Layout>
    </div>
  );
};

export default Orders;
