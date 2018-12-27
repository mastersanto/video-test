import ApolloClient from 'apollo-boost';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
// import { render } from 'react-dom';
// @ts-ignore
import { createGlobalStyle } from 'styled-components';

import Routes from './Routes';

const GRAPHQL_API_URL = 'http://localhost:8080/graphql';

const client = new ApolloClient({
  clientState: {
    resolvers: {
      Query: {
        localHello(obj: any, { subject }: { subject: string }) {
          return `Hello, ${subject}! from Web UI`;
        }
      }
    }
  },
  uri: GRAPHQL_API_URL
});
/*
render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
*/

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #ccc;
  }
  *:focus {
    outline: 0;
  }
  a {
    color: #0d0d0d;
    text-decoration: none;
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Routes />
  </ApolloProvider>,
  // @ts-ignore
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
