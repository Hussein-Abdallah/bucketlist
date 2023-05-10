import {ApolloClientProvider} from '../ApolloClientProvider';
import {CookiesProvider} from 'react-cookie';
import {AuthProvider} from '../AuthContext';

export function AppContext({children}) {
  return (
    <ApolloClientProvider>
      <CookiesProvider>
        <AuthProvider>{children}</AuthProvider>
      </CookiesProvider>
    </ApolloClientProvider>
  );
}
