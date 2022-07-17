import {User} from "../../users/graphQL/users.types";
import {gql} from "@apollo/client";
import {USER_FRAGMENT} from "../../users/graphQL/users.fragments";


export type MeData = { auth: { me: { token: string, user: User } } }
export const ME_QUERY = gql`
    ${USER_FRAGMENT}
    query {
      auth {
        me {
          token
          user {
            ...UserFragment
          }
        }
      }
    }
`;
