import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { NEW_PRODUCT, GET_PRODUCTS } from '../gql/product';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const NewProduct = () => {
  const router = useRouter();
  const [newProduct] = useMutation(NEW_PRODUCT, {
    update(cache, { data: { newProduct } }) {
      const { getProducts } = cache.readQuery({ query: GET_PRODUCTS });
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: [...getProducts, newProduct],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      stock: '',
      price: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('The name is required'),
      stock: Yup.number()
        .required('The stock is required')
        .positive('The stock must be positive')
        .integer('The stock must be an integer'),
      price: Yup.number()
        .required('The price is required')
        .positive('The price must be positive'),
    }),
    onSubmit: async values => {
      const { name, stock, price } = values;
      try {
        const { data } = await newProduct({
          variables: {
            input: {
              name,
              stock,
              price,
            },
          },
        });
        Swal.fire('Created!', 'The product was created', 'success');
        router.push('/products');
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-light'>New Product</h1>
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <form
            className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
            onSubmit={formik.handleSubmit}
          >
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='name'
              >
                Name
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline'
                type='text'
                id='name'
                placeholder='Product Name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div
                className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'
                role='alert'
              >
                <p className='font-bold'>Error</p>
                <p>{formik.errors.name}</p>
              </div>
            ) : null}
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='stock'
              >
                Stock
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline'
                type='number'
                id='stock'
                placeholder='Product Stock'
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.stock && formik.errors.stock ? (
              <div
                className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'
                role='alert'
              >
                <p className='font-bold'>Error</p>
                <p>{formik.errors.stock}</p>
              </div>
            ) : null}
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='price'
              >
                Price
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline'
                type='number'
                id='price'
                placeholder='Product Price'
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.price && formik.errors.price ? (
              <div
                className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'
                role='alert'
              >
                <p className='font-bold'>Error</p>
                <p>{formik.errors.price}</p>
              </div>
            ) : null}
            <input
              type='submit'
              className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900'
              value='Add New Product'
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewProduct;
