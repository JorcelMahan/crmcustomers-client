import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_USER } from '../gql/user';

const Header = () => {
  const router = useRouter();

  // Query Apollo
  const { data, loading, error } = useQuery(GET_USER);

  // Protect access to data
  if (loading) return null;

  // If there is no information
  if (!data.getUser) {
    return router.push('/login');
  }

  if (error) {
    localStorage.removeItem('token');
    router.push('/login');
  }

  const { name, lastname } = data.getUser;

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className='sm:flex sm:justify-between mb-6'>
      <p className='mr-2 mb:5 lg:mb-0'>
        Hello: {name} {lastname}
      </p>
      <button
        onClick={() => logout()}
        type='button'
        className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
