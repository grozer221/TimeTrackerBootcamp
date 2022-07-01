import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {schema} from './schema';

const link = createHttpLink({
    uri: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'https://localhost:7041/graphql' : '/graphql',
});

export const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            errorPolicy: 'all',
            notifyOnNetworkStatusChange: true,
        },
        query: {
            errorPolicy: 'all',
            notifyOnNetworkStatusChange: true,
        },
    },
    typeDefs: schema,
});
