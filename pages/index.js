import Layout from "../components/Layout";
import Client from "../components/Client";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS_SELLER } from "../gql/client";

const Index = () => {

  const { data, loading, error } = useQuery(GET_CLIENTS_SELLER);

  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  if (!data.getClientsSeller) {
    return router.push('/login');
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Clients</h1>

      <Link
        href="/newclient"
        className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">
        New Client
      </Link>

      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Name</th>
            <th className="w-1/5 py-2">Company</th>
            <th className="w-1/5 py-2">Email</th>
            <th className="w-1/5 py-2">Delete</th>
            <th className="w-1/5 py-2">Edit</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {data.getClientsSeller.map(client => (
            <Client
              key={client.id}
              client={client}
            />
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Index