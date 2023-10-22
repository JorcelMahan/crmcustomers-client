import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { GET_CLIENT, UPDATE_CLIENT } from '../../gql/client';
import Loader from '@/components/Loader';

const EditClient = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { data, loading, error } = useQuery(GET_CLIENT, {
    variables: {
      id,
    },
  });

  const [updateClient] = useMutation(UPDATE_CLIENT);

  const schemaValidation = Yup.object({
    name: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Last name is required'),
    company: Yup.string().required('Company is required'),
    email: Yup.string()
      .email('Email is not valid')
      .required('Email is required'),
  });

  if (loading) return <Loader />;
  if (error) return `Error! ${error.message}`;

  const { getClient } = data;

  const updateInfoClient = async values => {
    const { name, lastName, company, email, phone } = values;

    try {
      const { data } = await updateClient({
        variables: {
          id,
          input: {
            name,
            lastName,
            company,
            email,
            phone,
          },
        },
      });

      Swal.fire('Updated!', data.updateClient, 'success');

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-light'>Edit Client</h1>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <Formik
            validationSchema={schemaValidation}
            enableReinitialize
            initialValues={getClient}
            onSubmit={values => {
              updateInfoClient(values);
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
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id='name'
                      placeholder='Name'
                      value={props.values.name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
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
                      htmlFor='lastName'
                    >
                      Last name
                    </label>
                    <input
                      type='text'
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id='lastName'
                      placeholder='lastName'
                      value={props.values.lastName}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {props.touched.lastName && props.errors.lastName && (
                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className='font-bold'>Error</p>
                      <p>{props.errors.lastName}</p>
                    </div>
                  )}

                  <div className='mb-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='company'
                    >
                      Company
                    </label>
                    <input
                      type='text'
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id='company'
                      placeholder='Company'
                      value={props.values.company}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {props.touched.company && props.errors.company && (
                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className='font-bold'>Error</p>
                      <p>{props.errors.company}</p>
                    </div>
                  )}

                  <div className='mb-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='email'
                    >
                      Email
                    </label>
                    <input
                      type='email'
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id='email'
                      placeholder='Email'
                      value={props.values.email}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {props.touched.email && props.errors.email && (
                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className='font-bold'>Error</p>
                      <p>{props.errors.email}</p>
                    </div>
                  )}

                  <div className='mb-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='phone'
                    >
                      Phone
                    </label>
                    <input
                      type='tel'
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id='phone'
                      placeholder='Phone'
                      value={props.values.phone}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  <input
                    type='submit'
                    className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900'
                    value='Edit Client'
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

export default EditClient;
