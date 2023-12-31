import Link from 'next/link';
import { useRouter } from 'next/router';

const SideBar = () => {
  // Routing
  const router = useRouter();

  return (
    <aside className='bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
      <div>
        <p className='text-white text-2xl font-black'>CRM Customers</p>
      </div>

      <nav className='mt-5 list-none'>
        <li className={router.pathname === '/' ? 'bg-blue-800 p-2' : 'p-2'}>
          <Link href='/' className='text-white mb-2 block'>
            Clients
          </Link>
        </li>
        <li
          className={router.pathname === '/orders' ? 'bg-blue-800 p-2' : 'p-2'}
        >
          <Link href='/orders' className='text-white mb-2 block'>
            Orders
          </Link>
        </li>
        <li
          className={
            router.pathname === '/products' ? 'bg-blue-800 p-2' : 'p-2'
          }
        >
          <Link href='/products' className='text-white mb-2 block'>
            Products
          </Link>
        </li>
      </nav>
      <div className='sm:mt-10'>
        <p className='text-white text-2xl font-black'>Others</p>
      </div>
      <nav className='mt-5 list-none'>
        <li
          className={
            router.pathname === '/bestsellers' ? 'bg-blue-800 p-2' : 'p-2'
          }
        >
          <Link href='/bestsellers' className='text-white mb-2 block'>
            Best Sellers
          </Link>
        </li>
        <li
          className={
            router.pathname === '/bestcustomers' ? 'bg-blue-800 p-2' : 'p-2'
          }
        >
          <Link href='/bestcustomers' className='text-white mb-2 block'>
            Best Customers
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default SideBar;
