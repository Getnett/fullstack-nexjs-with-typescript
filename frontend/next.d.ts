import { ApolloClientCache } from './lib/apollo';
import { ApolloClient } from 'apollo-client';

declare module 'next' {
	export interface NextPageContext {
		apolloClient?: ApolloClient<ApplicationCache>;
	}
}
