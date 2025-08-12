"use client";

import { Transaction } from "@/components/Transaction/Transaction";
import { Transaction as TransactionType } from "@/types/transaction";
import { useCallback, useEffect, useState } from "react";

export const Session = () => {
  const [txns, setTxns] = useState<TransactionType[]>([]);

  const updateTxn = useCallback(
    (txnId: string, vendor: string | null, account: string | null) => {
      setTxns((prevTxns) =>
        prevTxns.map((txn) =>
          txn.id === txnId
            ? { ...txn, correctedVendor: vendor, correctedAccount: account }
            : txn
        )
      );
    },
    []
  );

  const validateTxn = useCallback((txnId: string) => {
    setTxns((prevTxns) =>
      prevTxns.map((txn) => (txn.id === txnId ? { ...txn, validated: true } : txn))
    );
    alert(`validateTxn: ${txnId}`);
  }, []);

  useEffect(() => {
    // TODO load txns from the server
    setTxns([
      {
        id: "1",
        date: new Date(),
        amountCents: 100,
        bankDetail: "Grubhub food order",
        vendor: "Grubhub",
        account: "meal",
        unsure: false,
        correctedVendor: null,
        correctedAccount: null,
        need_info: false,
        validated: false,
      },
    ]);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {txns.map((txn) => (
        <Transaction
          key={txn.id}
          txn={txn}
          updateTxn={updateTxn}
          validateTxn={validateTxn}
        />
      ))}
    </div>
  );
};
