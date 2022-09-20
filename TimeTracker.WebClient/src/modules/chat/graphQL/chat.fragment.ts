import {gql} from "@apollo/client";

export const MESSAGE_FRAGMENT = gql`
    fragment MessageFragment on MessageType {
        id
        createdAt
        updatedAt
        userIdTo
        userIdFrom
        message
        isRead
  }
`