import {gql} from '@apollo/client';

export const schema = gql`
  schema {
    query: RootQueries
  }

  type RootQueries {
    toDos: ToDosQueries
  }

  type ToDosQueries {
    getById(id: Int! = 0): Boolean
  }
`
