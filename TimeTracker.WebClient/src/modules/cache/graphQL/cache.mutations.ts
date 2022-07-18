import {gql} from '@apollo/client';

export type CacheRefreshAppData = { cache: { refreshApp: boolean } }
export type CacheRefreshAppVars = {}
export const CACHE_REFRESH_APP_MUTATION = gql`
    mutation {
        cache {
            refreshApp
        }
    }

`;
