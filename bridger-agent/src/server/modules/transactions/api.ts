import { prisma } from "@/lib/db";

// Helper function to map database Transaction to GraphQL format
const mapTransaction = (dbTxn: any) => ({
  txnId: dbTxn.id,
  sessionId: dbTxn.sessionId,
  vendor: dbTxn.vendor,
  account: dbTxn.account,
  unsure: dbTxn.unsure,
  validated: dbTxn.validated,
  correctedVendor: dbTxn.correctedVendor,
  correctedAccount: dbTxn.correctedAccount,
  needsInfo: dbTxn.needsInfo,
  date: dbTxn.date.toISOString(),
  amountCents: dbTxn.amountCents,
  bankDetail: dbTxn.bankDetail,
});

export const startSession = async () => {
  // Just return hardcoded session 1 for now
  return { id: 1 };
};

export const getTransactions = async (_sessionId: number) => {
  const transactions = await prisma.transaction.findMany({
    where: { sessionId: 1 }, // Always use session 1 for now
  });
  return transactions.map(mapTransaction);
};

export const updateTransaction = async (
  txnId: number,
  updates: {
    correctedVendor?: string;
    correctedAccount?: string;
    needsInfo?: boolean;
  }
) => {
  const updated = await prisma.transaction.update({
    where: { id: txnId },
    data: {
      correctedVendor: updates.correctedVendor,
      correctedAccount: updates.correctedAccount,
      needsInfo: updates.needsInfo,
    },
  });
  return mapTransaction(updated);
};

export const validateTransaction = async (txnId: number) => {
  const validated = await prisma.transaction.update({
    where: { id: txnId },
    data: { validated: true },
  });
  return mapTransaction(validated);
};

export const endSession = async (_sessionId: number) => {
  const unvalidated = await prisma.transaction.findFirst({
    where: { sessionId: 1, validated: false }, // Always check session 1
  });
  if (unvalidated) {
    throw new Error("Cannot end session: not all transactions validated");
  }
  return true;
};
