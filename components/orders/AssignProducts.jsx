import { useEffect, useState, useContext, use } from 'react';
import Select from 'react-select';
import { useQuery } from '@apollo/client';
import OrderContext from '../../context/orders/OrderContext';
import { GET_PRODUCTS } from '../../gql/product';
import Loader from '../Loader';

const AssignProducts = () => {
  const [products, setProducts] = useState([]);

  // Order context
  const orderContext = useContext(OrderContext);
  const { addProduct } = orderContext;

  // Consult DB
  const { data, loading, error, startPolling, stopPolling } =
    useQuery(GET_PRODUCTS);

  useEffect(() => {
    addProduct(products);
  }, [products]);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling;
    };
  }, [startPolling, stopPolling]);

  const selectProduct = product => {
    setProducts(product);
  };

  if (loading) return <Loader />;
  if (error) return `Error ${error.message}`;

  const { getProducts } = data;
  return (
    <>
      <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>
        2. Assign products to the order
      </p>
      <Select
        className='mt-3'
        options={getProducts}
        isMulti={true}
        onChange={option => selectProduct(option)}
        getOptionValue={options => options.id}
        getOptionLabel={options =>
          `${options.name} - ${options.stock} available`
        }
        placeholder='Select a product'
        noOptionsMessage={() => 'No results'}
      />
    </>
  );
};

export default AssignProducts;
