import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCT, UPDATE_PRODUCT } from '../../gql/product';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import Loader from '@/components/Loader';

const EditProduct = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      id,
    },
  });

  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const schemaValidation = Yup.object({
    name: Yup.string().required('Name is required'),
    stock: Yup.number()
      .required('Stock is required')
      .positive('Stock must be positive')
      .integer('Stock must be integer'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be positive'),
  });

  if (loading) return <Loader />;
  if (error) return `Error! ${error.message}`;

  const { getProduct } = data;

  const updateProductInfo = async values => {
    const { name, stock, price } = values;
    try {
      const { data } = await updateProduct({
        variables: {
          id,
          input: {
            name,
            stock,
            price,
          },
        },
      });

      Swal.fire('Updated', 'Product has been updated', 'success');

      router.push('/products');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-light'>Edit Product</h1>
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <Formik
            validationSchema={schemaValidation}
            enableReinitialize
            initialValues={getProduct}
            onSubmit={values => {
              updateProductInfo(values);
            }}
          >
            {props => {
              return (
                <form
                  className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                  onSubmit={props.handleSubmit}
                >
                  <div className='mb-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='name'
                    >
                      Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      placeholder='Product Name'
                      value={props.values.name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none
                        focus:shadow-outline'
                    />
                  </div>
                  {props.touched.name && props.errors.name && (
                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className='font-bold'>Error</p>
                      <p>{props.errors.name}</p>
                    </div>
                  )}
                  <div className='mb-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='stock'
                    >
                      Stock
                    </label>
                    <input
                      type='number'
                      id='stock'
                      placeholder='Product Stock'
                      value={props.values.stock}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none
                        focus:shadow-outline'
                    />
                  </div>
                  {props.touched.stock && props.errors.stock && (
                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className='font-bold'>Error</p>
                      <p>{props.errors.stock}</p>
                    </div>
                  )}
                  <div className='mb-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='price'
                    >
                      Price
                    </label>
                    <input
                      type='number'
                      id='price'
                      placeholder='Product Price'
                      value={props.values.price}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none
                        focus:shadow-outline'
                    />
                  </div>
                  {props.touched.price && props.errors.price && (
                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className='font-bold'>Error</p>
                      <p>{props.errors.price}</p>
                    </div>
                  )}
                  <input
                    type='submit'
                    className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900'
                    value='Save Changes'
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;
