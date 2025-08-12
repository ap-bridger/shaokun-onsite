import React from "react";
import { Transaction as TransactionType } from "@/types/transaction";

export const Transaction = ({ txn }: { txn: TransactionType }) => {
  const onClickValidate = () => {
    // TODO
  };

  const onClickFix = () => {
    // TODO
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        alignItems: "center",
      }}
    >
      {txn.validated ? <div>[Validated]</div> : <div>[Unvalidated]</div>}
      <div>{txn.bankDetail}</div>
      <div>{txn.correctedVendor || txn.vendor}</div>
      <div>{txn.correctedAccount || txn.account}</div>
      <div>{txn.amountCents}</div>
      <div>{txn.date.toLocaleDateString()}</div>
      <div>{txn.unsure}</div>
      <div>{txn.need_info}</div>
      <button
        style={{ backgroundColor: "green", color: "white", padding: "5px" }}
        onClick={onClickValidate}
      >
        Validate
      </button>
      <button
        style={{ backgroundColor: "red", color: "white", padding: "5px" }}
        onClick={onClickFix}
      >
        Fix
      </button>
    </div>
  );
};
