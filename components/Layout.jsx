import Head from 'next/head';
import Header from './Header';
import SideBar from './SideBar';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>CRM Customers</title>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
        />
      </Head>
      {router.pathname === '/login' || router.pathname === '/signup' ? (
        <div className='bg-gray-800 min-h-screen flex flex-col justify-center'>
          <div>{children}</div>
        </div>
      ) : (
        <div className='bg-gray-200 min-h-screen'>
          <div className='sm:flex min-h-screen'>
            <SideBar />
            <main className='sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5'>
              <Header />
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
