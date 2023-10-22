import { useState, useContext } from 'react';
import Layout from '../components/Layout';
import AssignClient from '../components/orders/AssignClient';
import AssignProducts from '../components/orders/AssignProducts';
import OrderSummary from '../components/orders/OrderSummary';
import Total from '../components/orders/Total';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { NEW_ORDER, GET_ORDERS_SELLER } from '../gql/order';
import { GET_PRODUCTS } from '../gql/product';
import OrderContext from '../context/orders/OrderContext';

const NewOrder = () => {
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const orderContext = useContext(OrderContext);
  const { client, products, total } = orderContext;

  const [newOrder] = useMutation(NEW_ORDER, {
    update(cache, { data: { newOrder } }) {
      const { getOrdersSeller } = cache.readQuery({
        query: GET_ORDERS_SELLER,
      });

      cache.writeQuery({
        query: GET_ORDERS_SELLER,
        data: {
          getOrdersSeller: [...getOrdersSeller, newOrder],
        },
      });
    },
  });

  const validateOrder = () => {
    return !products.every(product => product.quantity > 0) ||
      total === 0 ||
      client.length === 0
      ? ' opacity-50 cursor-not-allowed'
      : '';
  };

  const createNewOrder = async () => {
    const { id } = client;

    const order = products.map(({ __typename, stock, ...product }) => product);

    try {
      const { data } = await newOrder({
        variables: {
          input: {
            client: id,
            total,
            order,
          },
        },
      });

      router.push('/orders');
      Swal.fire('Success', 'Order created successfully', 'success');
    } catch (error) {
      setMessage(error.message.replace('GraphQL error: ', ''));
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      console.log('error', error);
    }
  };

  const showMessage = () => {
    return (
      <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
        <p>{message}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-light'>New Order</h1>
      {message && showMessage()}
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <AssignClient />
          <AssignProducts />
          <OrderSummary />
          <Total />
          <button
            type='button'
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validateOrder()}`}
            onClick={() => createNewOrder()}
          >
            Register Order
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NewOrder;
