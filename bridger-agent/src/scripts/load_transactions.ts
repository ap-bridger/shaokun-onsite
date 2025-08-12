import Papa from "papaparse";
import fs from "fs";
import { prisma } from "@/lib/db";

const CSV_PATH = "/Users/alex/Downloads/sample_transactions.csv";
const SESSION_ID = 1;

async function main() {
  const file = fs.readFileSync(CSV_PATH, "utf8");
  console.log(`Creating session: ${SESSION_ID}`);
  const session = await prisma.session.upsert({
    create: {
      id: SESSION_ID,
    },
    update: {},
    where: {
      id: SESSION_ID,
    },
  });
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: async (results: any) => {
      for (const result of results.data) {
        const transaction = await prisma.transaction.create({
          data: {
            sessionId: session.id,
            vendor: result.vendor,
            account: result.account,
            unsure: result.unsure == "1",
            date: new Date(result.date),
            amountCents: Number(result.amountCents),
            bankDetail: result.bankDetail,
            correctedAccount: null,
            correctedVendor: null,
          },
        });
        console.log("CREATED TRANSACTION:", transaction);
      }
    },
  });
}
main();
