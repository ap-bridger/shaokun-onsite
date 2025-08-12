/*
txn_id PK
session_id FK
date datetime
amount_cents int
bank_detail varchar
vendor varchar
account varchar
unsure bool
corrected_vendor varchar NULLABLE
corrected_account varchar NULLABLE
need_info bool DEFAULT 0
validated bool default 0
*/
export type Transaction = {
  id: string;
  date: Date;
  amountCents: number;
  bankDetail: string;
  vendor: string;
  account: string;
  unsure: boolean;
  correctedVendor: string | null;
  correctedAccount: string | null;
  need_info: boolean;
  validated: boolean;
};
