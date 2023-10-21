import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { UPDATE_ORDER, DELETE_ORDER, GET_ORDERS_SELLER } from '../gql/order';

const Order = ({ order }) => {
  const {
    id,
    total,
    client,
    state,
    client: { name, lastName, email, phone },
  } = order;

  const [orderState, setOrderState] = useState(state);
  const [orderClass, setOrderClass] = useState('');

  const [updateOrder] = useMutation(UPDATE_ORDER);
  const [deleteOrder] = useMutation(DELETE_ORDER, {
    update(cache) {
      const { getOrdersSeller } = cache.readQuery({
        query: GET_ORDERS_SELLER,
      });

      cache.writeQuery({
        query: GET_ORDERS_SELLER,
        data: {
          getOrdersSeller: getOrdersSeller.filter(order => order.id !== id),
        },
      });
    },
  });

  useEffect(() => {
    if (orderState) {
      setOrderState(orderState);
    }
    orderClassGenerator();
  }, [orderState]);

  const orderClassGenerator = () => {
    if (orderState === 'PENDING') {
      setOrderClass('border-yellow-500');
    } else if (orderState === 'COMPLETED') {
      setOrderClass('border-green-500');
    } else {
      setOrderClass('border-red-800');
    }
  };

  const changeOrderState = async newState => {
    try {
      const { data } = await updateOrder({
        variables: {
          id,
          input: {
            state: newState,
            client: client.id,
          },
        },
      });

      setOrderState(data.updateOrder.state);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDeleteOrder = () => {
    Swal.fire({
      title: 'Do you want to delete this order?',
      text: "This action can't be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const { data } = await deleteOrder({
            variables: {
              id,
            },
          });

          Swal.fire('Deleted!', data.deleteOrder, 'success');
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div
      className={`${orderClass} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}
    >
      <div>
        <p className='font-bold text-gray-800'>
          Client: {name} {lastName}
        </p>
        {email && (
          <p className='flex items-center my-2'>
            <svg
              className='w-4 h-4 mr-2'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
            {email}
          </p>
        )}
        {phone && (
          <p className='flex items-center my-2'>
            <svg
              className='w-4 h-4 mr-2'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
            {phone}
          </p>
        )}
        <h2 className='text-gray-800 font-bold mt-10'>Order State:</h2>
        <select
          className='mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold'
          value={orderState}
          onChange={e => changeOrderState(e.target.value)}
        >
          <option value='COMPLETED'>COMPLETED</option>
          <option value='PENDING'>PENDING</option>
          <option value='CANCELED'>CANCELED</option>
        </select>
      </div>
      <div>
        <h2 className='text-gray-800 font-bold mt-2'>Order Summary</h2>
        {order.order.map((article, index) => (
          <div key={index} className='mt-4'>
            <p className='text-sm text-gray-600'>Product: {article.name}</p>
            <p className='text-sm text-gray-600'>
              Quantity: {article.quantity}
            </p>
          </div>
        ))}
        <p className='text-gray-800 mt-3 font-bold'>
          Total: <span className='font-light'>${total}</span>
        </p>
        <button
          className='uppercase text-xs font-bold flex items-center mt-4 bg-red-800 px-5 py-2  text-white rounded leading-tight'
          onClick={() => confirmDeleteOrder()}
        >
          Delete Order
          <svg
            className='w-4 h-4 ml-2'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Order;
