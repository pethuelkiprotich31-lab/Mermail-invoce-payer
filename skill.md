---
name: mermail-invoice-payer
description: Auto pay invoices from mermail inbox. Detects invoice emails and pays via Solana USDC and M-Pesa Daraja STK Push
author: pethuelkiprotich31-lab
version: 1.0.0
---

# Mermail Invoice Payer

Auto-pays invoices received in Mermail inbox.

## How it works
1. Watches Mermail inbox for new emails
2. Checks if it's an invoice (looks for "invoice", "bill", "payment due")
3. Extracts amount and payee
4. Pays automatically if under $100 limit
5. Supports Solana USDC and M-Pesa Daraja for Kenya

## Example
Email: "Invoice #123 - $50 due from Acme"
Result: Skill pays $50 and replies "Paid invoice #123"

## Config
- AUTO_PAY_LIMIT=100
- M_PESA_KEY (for Daraja)
