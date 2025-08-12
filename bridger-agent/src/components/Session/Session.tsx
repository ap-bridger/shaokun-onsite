"use client";

import { Transaction } from "@/components/Transaction/Transaction";
import { Transaction as TransactionType } from "@/types/transaction";
import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { GET_TRANSACTIONS } from "./Session.api";

export const Session = () => {
  const { data } = useQuery(GET_TRANSACTIONS, {
    variables: {
      sessionId: 1, // Hard code for now
    },
  });
  const txns: TransactionType[] = data?.getTransactions || []; // TODO: Correct spinner + loading

  const updateTxn = useCallback(
    (txnId: string, vendor: string | null, account: string | null) => {
      alert(`Updating: ${txnId}`);
    },
    []
  );

  const validateTxn = useCallback((txnId: string) => {
    alert(`validateTxn: ${txnId}`);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {txns.map((txn: TransactionType) => (
        <Transaction
          key={txn.txnId}
          txn={txn}
          updateTxn={updateTxn}
          validateTxn={validateTxn}
        />
      ))}
    </div>
  );
};
