import { useEffect } from 'react';
import Layout from '../components/Layout';
import { useQuery } from '@apollo/client';
import { BEST_CLIENTS } from '../gql/client';
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

const BestCustomers = () => {
  const { data, loading, error, startPolling, stopPolling } =
    useQuery(BEST_CLIENTS);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return <Loader />;
  if (error) return `Error: ${error.message}`;

  const { bestClients } = data;

  const clientChart = [];

  bestClients.map((client, index) => {
    clientChart[index] = {
      ...client.client[0],
      total: client.total,
    };
  });

  return (
    <Layout>
      <h1 className='text-2xl text-gray-800 font-light'>Best Clients</h1>

      <ResponsiveContainer width={'99%'} height={550}>
        <BarChart
          className='mt-10'
          width={600}
          height={500}
          data={clientChart}
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

export default BestCustomers;
