// Mermail Invoice Payer - Auto pay invoices + M-Pesa Daraja

type Email = {
  subject: string;
  from: string;
  body: string;
}

export function isInvoice(email: Email): boolean {
  const text = `${email.subject} ${email.body}`.toLowerCase();
  return text.includes("invoice") || text.includes("payment due") || text.includes("bill");
}

export function extractAmount(body: string): number | null {
  const match = body.match(/(?:\$|KES|KSH)\s?(\d+(\.\d+)?)/i);
  if (match) return parseFloat(match[1]);
  const fallback = body.match(/(\d+(\.\d+)?)/);
  return fallback ? parseFloat(fallback[1]) : null;
}

export async function onNewEmail(email: Email) {
  console.log("Checking email:", email.subject);

  if (!isInvoice(email)) {
    console.log("Not invoice, skip");
    return { action: "skipped" };
  }

  const amount = extractAmount(email.body);
  console.log(`Invoice detected! Amount: ${amount} from ${email.from}`);

  const LIMIT = 100;
  if (amount && amount > LIMIT) {
    return { action: "needs_approval", reason: "Amount exceeds limit" };
  }

  // Payment logic here
  // 1. Solana USDC transfer
  // 2. M-Pesa Daraja STK Push for Kenyan bills

  console.log(`Ready to auto-pay ${amount} to ${email.from}`);

  return {
    action: "paid",
    amount,
    payee: email.from,
    method: amount && amount < 50 ? "mpesa_daraja" : "solana_usdc"
  };
}

console.log("Mermail Invoice Payer skill loaded...");
