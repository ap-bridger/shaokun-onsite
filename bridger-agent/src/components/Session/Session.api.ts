import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql(/* GraphQL */ `
  query GetTransactions($sessionId: Int!) {
    getTransactions(sessionId: $sessionId) {
      txnId
      sessionId
      vendor
      account
      unsure
      validated
      correctedVendor
      correctedAccount
      needsInfo
      date
      amountCents
      bankDetail
    }
  }
`);
