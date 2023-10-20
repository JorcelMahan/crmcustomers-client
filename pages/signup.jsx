import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { NEW_USER } from '../gql/user';

const SignUp = () => {
  // Routing
  const router = useRouter();

  // Mutation to create new users
  const [newUser] = useMutation(NEW_USER);

  // State for messages
  const [message, setMessage] = useState(null);

  // Formik for form validation
  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      lastName: Yup.string().required('lastName is required'),
      email: Yup.string()
        .email('Email is not valid')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    }),
    onSubmit: async values => {
      const { name, lastName, email, password } = values;

      try {
        const { data } = await newUser({
          variables: {
            input: {
              name,
              lastName,
              email,
              password,
            },
          },
        });

        // User created successfully
        setMessage(`User ${data.newUser.name} created successfully`);

        setTimeout(() => {
          setMessage(null);
          router.push('/login');
        }, 3000);
      } catch (error) {
        setMessage(error.message.replace('GraphQL error: ', ''));
        console.log(error.message);
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
      {message && showMessage()}
      <h1 className='text-center text-2xl text-white font-light'>Sign Up</h1>
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-sm'>
          <form
            className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
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
                placeholder='Name'
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
                htmlFor='lastName'
              >
                Last name
              </label>
              <input
                type='text'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='lastName'
                placeholder='lastName'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.lastName && formik.errors.lastName ? (
              <div
                className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'
                role='alert'
              >
                <p className='font-bold'>Error</p>
                <p>{formik.errors.lastName}</p>
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
              <div
                className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'
                role='alert'
              >
                <p className='font-bold'>Error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <input
                type='password'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='password'
                placeholder='Password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div
                className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'
                role='alert'
              >
                <p className='font-bold'>Error</p>
                <p>{formik.errors.password}</p>
              </div>
            ) : null}
            <input
              type='submit'
              className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900'
              value='Sign Up'
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
