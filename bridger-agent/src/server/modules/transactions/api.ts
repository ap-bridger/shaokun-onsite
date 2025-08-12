// Stub implementation for transaction session API

export const startSession = async () => {
  return { id: 1 };
};

export const getTransactions = async (sessionId: number) => {
  // Return dummy transactions for the session
  return [
    {
      txnId: "TXN001",
      sessionId: sessionId,
      vendor: "Amazon",
      account: "Office Supplies",
      unsure: false,
      validated: false,
      correctedVendor: null,
      correctedAccount: null,
      needInfo: false,
    },
    {
      txnId: "TXN002",
      sessionId: sessionId,
      vendor: "Starbucks",
      account: "Meals & Entertainment",
      unsure: true,
      validated: false,
      correctedVendor: null,
      correctedAccount: null,
      needInfo: false,
    },
  ];
};

export const updateTransaction = async (
  txnId: string,
  updates: {
    correctedVendor?: string;
    correctedAccount?: string;
    needInfo?: boolean;
  }
) => {
  // Just return a dummy updated transaction
  return {
    txnId: txnId,
    sessionId: 1,
    vendor: "Amazon",
    account: "Office Supplies",
    unsure: false,
    validated: true,
    correctedVendor: updates.correctedVendor || null,
    correctedAccount: updates.correctedAccount || null,
    needInfo: updates.needInfo || false,
  };
};

export const requestClientInfo = async (txnId: string) => {
  // Just return a dummy transaction with needInfo set to true
  return {
    txnId: txnId,
    sessionId: 1,
    vendor: "Starbucks",
    account: "Meals & Entertainment",
    unsure: true,
    validated: true,
    correctedVendor: null,
    correctedAccount: null,
    needInfo: true,
  };
};

export const validateTransaction = async (txnId: string) => {
  return {
    txnId: txnId,
    sessionId: 1,
    vendor: "Starbucks",
    account: "Meals & Entertainment",
    unsure: true,
    validated: true,
    correctedVendor: null,
    correctedAccount: null,
    needInfo: true,
  };
};


export const endSession = async (_sessionId: number) => {
  // Just return true
  return true;
};