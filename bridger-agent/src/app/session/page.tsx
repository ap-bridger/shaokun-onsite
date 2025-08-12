"use client";

import { apolloClient } from "@/client/graphql/apollo-client";
import { Session } from "@/components/Session/Session";
import { ApolloProvider } from "@apollo/client";

export default function SessionPage() {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">Session</h1>
        <Session />
      </div>
    </ApolloProvider>
  );
}
