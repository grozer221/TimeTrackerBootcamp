import {gql} from '@apollo/client';

export const schema = gql`
schema {
  query: Queries
  mutation: Mutations
}

type Queries {
  auth: AuthQueries
}

type AuthQueries {
  me: AuthResponseType!
}

type AuthResponseType {
  user: UserType!
  token: String!
}

type UserType {
  id: Guid!
  createdAt: DateTime!
  updatedAt: DateTime!
  firstName: String
  lastName: String
  middleName: String
  email: String!
  role: Role!
}

scalar Guid

"""
The \`DateTime\` scalar type represents a date and time. \`DateTime\` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard.
"""
scalar DateTime

enum Role {
  EMPLOYEE
  ADMINISTRATOR
}

type Mutations {
  auth: AuthMutations
}

type AuthMutations {
  login(
    """
    Argument for login User
    """
    authLoginInputType: AuthLoginInputType!
  ): AuthResponseType!
  logout: Boolean!
  register(
    """
    Argument for register User
    """
    authRegisterInputType: AuthRegisterInputType!
  ): AuthResponseType!
}

input AuthLoginInputType {
  email: String!
  password: String!
}

input AuthRegisterInputType {
  email: String!
  password: String!
  firstName: String!
  lastName: String!
  middleName: String!
}

`
