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
      needsInfo: false,
      date: new Date().toISOString(),
      amountCents: -5999,
      bankDetail: "AMAZON.COM*123456789",
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
      needsInfo: false,
      date: new Date().toISOString(),
      amountCents: -650,
      bankDetail: "STARBUCKS STORE #1234",
    },
  ];
};

export const updateTransaction = async (
  txnId: string,
  updates: {
    correctedVendor?: string;
    correctedAccount?: string;
    needsInfo?: boolean;
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
    needsInfo: updates.needsInfo || false,
    date: new Date().toISOString(),
    amountCents: -5999,
    bankDetail: "AMAZON.COM*123456789",
  };
};

export const requestClientInfo = async (txnId: string) => {
  // Just return a dummy transaction with needsInfo set to true
  return {
    txnId: txnId,
    sessionId: 1,
    vendor: "Starbucks",
    account: "Meals & Entertainment",
    unsure: true,
    validated: true,
    correctedVendor: null,
    correctedAccount: null,
    needsInfo: true,
    date: new Date().toISOString(),
    amountCents: -650,
    bankDetail: "STARBUCKS STORE #1234",
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
    needsInfo: false,
    date: new Date().toISOString(),
    amountCents: -650,
    bankDetail: "STARBUCKS STORE #1234",
  };
};


export const endSession = async (_sessionId: number) => {
  // Just return true
  return true;
};