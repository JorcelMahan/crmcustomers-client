import { useEffect } from 'react';
import Layout from '../components/Layout';
import { useQuery } from '@apollo/client';
import { BEST_SELLERS } from '../gql/client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Loader from '@/components/Loader';

const BestSellers = () => {
  const { data, loading, error, startPolling, stopPolling } =
    useQuery(BEST_SELLERS);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return <Loader />;
  if (error) return `Error: ${error.message}`;

  const { bestSellers } = data;

  const sellerChart = [];

  bestSellers.map((seller, index) => {
    sellerChart[index] = {
      ...seller.seller[0],
      total: seller.total,
    };
  });

  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-light'>Best Sellers</h1>

      <ResponsiveContainer width={'99%'} height={550}>
        <BarChart
          className='mt-10'
          width={600}
          height={500}
          data={sellerChart}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='total' fill='#3182CE' />
        </BarChart>
      </ResponsiveContainer>
    </Layout>
  );
};

export default BestSellers;
