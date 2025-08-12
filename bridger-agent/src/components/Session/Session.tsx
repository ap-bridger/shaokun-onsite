"use client";

import { Transaction } from "@/components/Transaction/Transaction";
import { Transaction as TransactionType } from "@/types/transaction";
import { useEffect, useState } from "react";

export const Session = () => {
  const [txns, setTxns] = useState<TransactionType[]>([]);

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
        <Transaction key={txn.id} txn={txn} />
      ))}
    </div>
  );
};
