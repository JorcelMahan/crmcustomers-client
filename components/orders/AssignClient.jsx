import { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { useQuery } from '@apollo/client';
import OrderContext from '../../context/orders/OrderContext';
import { GET_CLIENTS_SELLER } from '../../gql/client';
import Loader from '../Loader';

const AssignClient = () => {
  const [client, setClient] = useState([]);

  // Order context
  const orderContext = useContext(OrderContext);
  const { addClient } = orderContext;

  // Consult DB
  const { data, loading, error } = useQuery(GET_CLIENTS_SELLER);

  useEffect(() => {
    addClient(client);
  }, [client]);

  const selectClient = client => {
    setClient(client);
  };

  if (loading) return <Loader />;
  if (error) return `Error ${error.message}`;

  const { getClientsSeller } = data;
  return (
    <>
      <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>
        1. Assign a client to the order
      </p>
      <Select
        className='mt-3'
        options={getClientsSeller}
        onChange={option => selectClient(option)}
        getOptionValue={options => options.id}
        getOptionLabel={options => options.name}
        placeholder='Select a client'
        noOptionsMessage={() => 'No results'}
      />
    </>
  );
};

export default AssignClient;
