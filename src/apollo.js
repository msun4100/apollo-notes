import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { ApolloLink } from "apollo-link";

import { typeDefs, defaults, resolvers } from "./clientState";

const cache = new InMemoryCache();
const stateLink = withClientState({
  cache,
  typeDefs,
  defaults,
  resolvers,
});

// apollo-boost 는 http링크가 필요하기 때문에 stateLink 커스터마이징
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink]),
});

export default client;
