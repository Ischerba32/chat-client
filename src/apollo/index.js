import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";

export const GET_MESSAGES = gql`
  query {
    messages {
      id
      content
      user
    }
  }
`;

export const POST_MESSAGES = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});
