import { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { NEW_CLIENT, GET_CLIENTS_SELLER } from '../gql/client';
import { useRouter } from 'next/router';

const NewClient = () => {
  const [message, setMessage] = useState(null);
  const [newClient] = useMutation(NEW_CLIENT, {
    update(cache, { data: { newClient } }) {
      const { getClientsSeller } = cache.readQuery({
        query: GET_CLIENTS_SELLER,
      });

      cache.writeQuery({
        query: GET_CLIENTS_SELLER,
        data: {
          getClientsSeller: [...getClientsSeller, newClient],
        },
      });
    },
  });

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      company: '',
      email: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      lastName: Yup.string().required('Last name is required'),
      company: Yup.string().required('Company is required'),
      email: Yup.string()
        .email('Email is not valid')
        .required('Email is required'),
    }),
    onSubmit: async values => {
      const { name, lastName, company, email, phone } = values;

      try {
        const { data } = await newClient({
          variables: {
            input: {
              name,
              lastName,
              company,
              email,
              phone,
            },
          },
        });

        setMessage(`Client ${data.newClient.name} created successfully`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
        router.push('/');
      } catch (error) {
        setMessage(error.message.replace('GraphQL error: ', ''));
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    },
  });

  const showMessage = () => {
    return (
      <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
        <p>{message}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-light'>New Client</h1>
      {message && showMessage()}
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
                type='text'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='name'
                placeholder='Client Name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p className='font-bold'>Error</p>
                <p>{formik.errors.name}</p>
              </div>
            ) : null}
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='lastName'
              >
                Last Name
              </label>
              <input
                type='text'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='lastName'
                placeholder='Client Last Name'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p className='font-bold'>Error</p>
                <p>{formik.errors.lastName}</p>
              </div>
            ) : null}
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
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.company && formik.errors.company ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p className='font-bold'>Error</p>
                <p>{formik.errors.company}</p>
              </div>
            ) : null}
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
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p className='font-bold'>Error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}
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
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <input
              type='submit'
              className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900'
              value='Register Client'
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewClient;
