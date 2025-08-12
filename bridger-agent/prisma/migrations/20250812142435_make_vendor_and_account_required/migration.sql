/*
  Warnings:

  - Made the column `account` on table `Transaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vendor` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" INTEGER NOT NULL,
    "vendor" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "unsure" BOOLEAN NOT NULL,
    "date" DATETIME NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "bankDetail" TEXT NOT NULL,
    "correctedVendor" TEXT,
    "correctedAccount" TEXT,
    "needsInfo" BOOLEAN NOT NULL DEFAULT false,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Transaction_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("account", "amountCents", "bankDetail", "correctedAccount", "correctedVendor", "date", "id", "needsInfo", "sessionId", "unsure", "validated", "vendor") SELECT "account", "amountCents", "bankDetail", "correctedAccount", "correctedVendor", "date", "id", "needsInfo", "sessionId", "unsure", "validated", "vendor" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
