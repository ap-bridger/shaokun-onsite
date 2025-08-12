import { greetings } from "@/server/modules/greet/api";
import {
  startSession,
  getTransactions,
  updateTransaction,
  requestClientInfo,
  validateTransaction,
  endSession,
} from "@/server/modules/transactions/api";
import { createSchema, createYoga } from "graphql-yoga";

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        greetings: String
        getTransactions(sessionId: Int!): [Transaction!]!
      }

      type Mutation {
        startSession: Session!
        updateTransaction(
          txnId: String!
          correctedVendor: String
          correctedAccount: String
          needsInfo: Boolean
        ): Transaction!
        requestClientInfo(txnId: String!): Transaction!
        validateTransaction(txnId: String!): Transaction!
        endSession(sessionId: Int!): Boolean!
      }

      type Session {
        id: Int!
      }

      type Transaction {
        txnId: String!
        sessionId: Int!
        vendor: String!
        account: String!
        unsure: Boolean!
        validated: Boolean!
        correctedVendor: String
        correctedAccount: String
        needsInfo: Boolean!
        date: String!
        amountCents: Int!
        bankDetail: String!
      }

      input TransactionInput {
        txnId: String!
        vendor: String!
        account: String!
        unsure: Boolean
      }
    `,
    resolvers: {
      Query: {
        greetings,
        getTransactions: async (_: any, args: { sessionId: number }) => {
          return await getTransactions(args.sessionId);
        },
      },
      Mutation: {
        startSession: async () => {
          return await startSession();
        },
        updateTransaction: async (
          _: any,
          args: {
            txnId: string;
            correctedVendor?: string;
            correctedAccount?: string;
            needsInfo?: boolean;
          }
        ) => {
          return await updateTransaction(args.txnId, {
            correctedVendor: args.correctedVendor,
            correctedAccount: args.correctedAccount,
            needsInfo: args.needsInfo,
          });
        },
        requestClientInfo: async (_: any, args: { txnId: string }) => {
          return await requestClientInfo(args.txnId);
        },
        validateTransaction: async (_: any, args: { txnId: string }) => {
          return await validateTransaction(args.txnId);
        },
        endSession: async (_: any, args: { sessionId: number }) => {
          return await endSession(args.sessionId);
        },
      },
    },
  }),

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: "/api/graphql",

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
