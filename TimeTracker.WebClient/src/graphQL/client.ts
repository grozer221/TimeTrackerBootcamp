import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {schema} from './schema';
import {setContext} from '@apollo/client/link/context';

const authLink = setContext((_, {headers}) => ({
    headers: {
        ...headers,
        authorization: `Bearer ${localStorage.getItem('TOKEN') ?? ''}`,
    },
}));

const httpLink  = createHttpLink({
    uri: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'https://localhost:7041/graphql' : '/graphql',
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
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
    typeDefs: schema
});
