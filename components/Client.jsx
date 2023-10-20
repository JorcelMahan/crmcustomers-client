import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { DELETE_CLIENT, GET_ORDERS_SELLER } from '../gql/client';

const Client = ({ client }) => {
  const router = useRouter();
  const { name, lastname, company, email, id } = client;

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    update(cache) {
      // Get cache object
      const { getOrdersSeller } = cache.readQuery({ query: GET_ORDERS_SELLER });
      // Rewrite cache
      cache.writeQuery({
        query: GET_ORDERS_SELLER,
        data: {
          getOrdersSeller: getOrdersSeller.filter(
            order => order.client.id !== id
          ),
        },
      });
    },
  });

  const confirmDeleteClient = async () => {
    const result = await Swal.fire({
      title: '¿Do you want to delete this client?',
      text: "This action can't be undone",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });
    if (result.isConfirmed) {
      try {
        // Delete client
        const { data } = await deleteClient({
          variables: {
            id,
          },
        });
        // Show alert
        Swal.fire('Deleted!', data.deleteClient, 'success');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editClient = () => {
    router.push({
      pathname: '/editclient/[id]',
      query: { id },
    });
  };

  return (
    <tr>
      <td className='border px-4 py-2'>
        {name} {lastname}
      </td>
      <td className='border px-4 py-2'>{company}</td>
      <td className='border px-4 py-2'>{email}</td>
      <td className='border px-4 py-2'>
        <button
          type='button'
          className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
          onClick={() => confirmDeleteClient()}
        >
          Delete
          <svg
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            className='w-4 h-4 ml-2'
          >
            <path d='M5 12h14M12 5l7 7-7 7'></path>
          </svg>
        </button>
      </td>
      <td className='border px-4 py-2'>
        <button
          type='button'
          className='flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
          onClick={() => editClient()}
        >
          Edit
          <svg
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            className='w-4 h-4 ml-2'
          >
            <path d='M5 12h14M12 5l7 7-7 7'></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Client;
