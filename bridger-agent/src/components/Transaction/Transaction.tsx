"use client";

import React from "react";
import { Transaction as TransactionType } from "@/types/transaction";

interface Props {
  txn: TransactionType;
  updateTxn: (
    txnId: string,
    vendor: string | null,
    account: string | null
  ) => void;
  validateTxn: (txnId: string) => void;
}

export const Transaction = ({ txn, updateTxn, validateTxn }: Props) => {
  const [isNeedInfoRequested, setIsNeedInfoRequested] = React.useState<boolean>(
    txn.needsInfo
  );
  const [isFixDialogOpen, setIsFixDialogOpen] = React.useState<boolean>(false);
  const [vendorInput, setVendorInput] = React.useState<string>(
    txn.correctedVendor || txn.vendor
  );
  const [accountInput, setAccountInput] = React.useState<string>(
    txn.correctedAccount || txn.account
  );
  const onClickValidate = () => {
    validateTxn(txn.txnId);
  };

  const onClickFix = () => {
    setIsFixDialogOpen(true);
  };

  const onSubmitFix = () => {
    const vendorValue = vendorInput.trim() === "" ? null : vendorInput.trim();
    const accountValue =
      accountInput.trim() === "" ? null : accountInput.trim();
    updateTxn(txn.txnId, vendorValue, accountValue);
    setIsFixDialogOpen(false);
  };

  const onCancelFix = () => {
    // reset inputs to current values before closing
    setVendorInput(txn.correctedVendor || txn.vendor);
    setAccountInput(txn.correctedAccount || txn.account);
    setIsFixDialogOpen(false);
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
      {txn.validated ? <div>✅</div> : <div>❓</div>}
      <div>{txn.bankDetail}</div>
      <div>{txn.correctedVendor || txn.vendor}</div>
      <div>{txn.correctedAccount || txn.account}</div>
      <div>{txn.amountCents}</div>
      <div>{txn.date}</div>
      <div>{txn.unsure}</div>
      <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <input
          type="checkbox"
          checked={isNeedInfoRequested}
          onChange={(e) => setIsNeedInfoRequested(e.target.checked)}
        />
        Need info
      </label>
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
      {isFixDialogOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "16px",
              borderRadius: "8px",
              minWidth: "320px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ fontWeight: 600, fontSize: "16px" }}>
              Edit transaction
            </div>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span>Vendor</span>
              <input
                value={vendorInput}
                onChange={(e) => setVendorInput(e.target.value)}
                placeholder="Enter vendor"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  padding: "8px 10px",
                }}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span>Account</span>
              <input
                value={accountInput}
                onChange={(e) => setAccountInput(e.target.value)}
                placeholder="Enter account"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  padding: "8px 10px",
                }}
              />
            </label>
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
            >
              <button onClick={onCancelFix} style={{ padding: "6px 10px" }}>
                Cancel
              </button>
              <button
                onClick={onSubmitFix}
                style={{
                  backgroundColor: "#111827",
                  color: "white",
                  padding: "6px 10px",
                  borderRadius: 6,
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
