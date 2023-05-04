import {ApolloClientProvider} from '../ApolloClientProvider';
import {CookiesProvider} from 'react-cookie';

export function AppContext({children}) {
  return (
    <ApolloClientProvider>
      <CookiesProvider>{children}</CookiesProvider>
    </ApolloClientProvider>
  );
}
