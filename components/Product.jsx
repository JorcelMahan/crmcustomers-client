import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { DELETE_PRODUCT, GET_PRODUCTS } from '../gql/product';

const Product = ({ product }) => {
  const { id, name, stock, price } = product;

  const router = useRouter();

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    update(cache) {
      const { getProducts } = cache.readQuery({ query: GET_PRODUCTS });
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: getProducts.filter(
            currentProduct => currentProduct.id !== id
          ),
        },
      });
    },
  });

  const confirmDeleteProduct = () => {
    Swal.fire({
      title: 'Do you want to delete this product?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const { data } = await deleteProduct({
            variables: {
              id,
            },
          });
          Swal.fire('Deleted!', data.deleteProduct, 'success');
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const editProduct = () => {
    router.push({
      pathname: '/editproduct/[id]',
      query: { id },
    });
  };

  return (
    <tr>
      <td className='border px-4 py-2'>{name}</td>
      <td className='border px-4 py-2'>{stock} parts</td>
      <td className='border px-4 py-2'>$ {price}</td>
      <td className='border px-4 py-2'>
        <button
          type='button'
          className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
          onClick={() => confirmDeleteProduct()}
        >
          Delete
          <svg
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='w-4 h-4 ml-2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            ></path>
          </svg>
        </button>
      </td>
      <td className='border px-4 py-2'>
        <button
          type='button'
          className='flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
          onClick={() => editProduct()}
        >
          Edit
          <svg
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='w-4 h-4 ml-2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
            ></path>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15 12l-3 9 6-9z'
            ></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Product;
