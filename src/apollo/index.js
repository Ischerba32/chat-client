import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";

import { WebSocketLink } from "@apollo/client/link/ws"

const link = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true,
  }
})

export const GET_MESSAGES = gql`
  subscription {
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
  link,
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});
