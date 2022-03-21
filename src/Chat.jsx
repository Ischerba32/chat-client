import React from 'react'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const GET_MESSAGES = gql`
query {
  messages {
    id
    content
    user
  }
}`;

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

const Chat = () => {
  return (
    <div className=""><Messages user="John"/></div>
  )
}

export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
)