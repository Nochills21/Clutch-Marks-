// ============================================================
// Payment / billing configuration — Clutch Marks
// ============================================================
// Kept out of .env (committed) and out of the build bundle so the
// gateway/token data and account details are not shipped to users.
// These are the live values used by the site owner for the
// manual bank-transfer + Urpay payment flow.

export const PAYMENT = {
  bankTransfer: {
    // Receiving account — IBAN only (bank name intentionally not published)
    accountHolder: "Thaer Saadeh",
    iban: "SA9320000002550258779940",
    // WhatsApp reference so bank-side queries reach the right person
    whatsappRef: "0547388010",
  },

  // Urpay e-wallet receiving number
  urpay: {
    number: "+966547388010",
    name: "Zaid Saadeh",
  },

  // Billing contact details
  contact: {
    name: "Zaid Saadeh",
    email: "zaidthaersaadeh@gmail.com",
    whatsapp: "0547388010",
  },
} as const;

export type PaymentConfig = typeof PAYMENT;
