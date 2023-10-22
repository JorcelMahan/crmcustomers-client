import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client';
import client from '../config/apollo';
import OrderState from '../context/orders/OrderState';

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <OrderState>
        <Component {...pageProps} />
      </OrderState>
    </ApolloProvider>
  );
}
