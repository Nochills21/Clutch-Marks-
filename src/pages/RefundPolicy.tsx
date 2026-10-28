// Refund policy — the document the trial copy on /pricing promises.
//
// It is written against what the code actually does, so the two cannot quietly
// disagree: `billing` starts every subscription with a 3-day trial, requires a
// card up front, charges the first payment when the trial ends, and offers
// Stripe's customer portal for cancellation. Change any of those and this page
// has to change with it (the same way the trial length is one value).
import { Link } from "react-router-dom";
import { LegalShell, type Section } from "./Legal";
import { PRIVACY_CONTACT_EMAIL, PRIVACY_CONTACT_HREF, REFUND_LAST_UPDATED, REFUND_POLICY_VERSION, TRIAL_DAYS } from "@/lib/legal";
import { money, planById } from "@/lib/plans";

const monthly = planById("monthly");
const quarterly = planById("quarterly");
const annual = planById("annual");

const priceLine = (id: string, label: string) => {
  const plan = planById(id);
  if (!plan) return null;
  return (
    <tr key={plan.id}>
      <th>{label}</th>
      <td>{money(plan.priceTotal)}</td>
      <td>{plan.months === 1 ? "every month" : plan.months === 12 ? "every year" : `every ${plan.months} months`}</td>
    </tr>
  );
};

const sections: Section[] = [
  {
    heading: "Your 3-day free trial",
    body: (
      <>
        <p>
          Every paid plan starts with a {TRIAL_DAYS}-day free trial. You get full access to Clutch Marks — every
          subject, every level, the AI marker, the planner and the whole past-paper archive — from the moment the
          trial starts.
        </p>
        <p>
          The trial is free, but it is not anonymous: because it converts into a paid subscription automatically, we
          ask for a card or Apple Pay at the start. Nothing is charged during the {TRIAL_DAYS} days.
        </p>
      </>
    ),
  },
  {
    heading: "What the plans cost after the trial",
    body: (
      <>
        <p>
          When the trial ends we take the first payment for the plan you chose. These are the current prices, taken
          from the same table the pricing page reads:
        </p>
        <table className="w-full text-xs border-collapse [&_th]:text-left [&_th]:align-top [&_th]:py-2 [&_th]:pr-3 [&_th]:text-foreground [&_td]:align-top [&_td]:py-2 [&_td]:pr-3 [&_td]:border-t [&_td]:border-border/60">
          <thead>
            <tr>
              <th>Plan</th>
              <th>Charged</th>
              <th>How often</th>
            </tr>
          </thead>
          <tbody>
            {priceLine(monthly?.id ?? "monthly", "Monthly")}
            {priceLine(quarterly?.id ?? "quarterly", "3 months")}
            {priceLine(annual?.id ?? "annual", "Annual")}
          </tbody>
        </table>
        <p>
          After the first payment, the plan renews at the same interval until you cancel. See the{" "}
          <Link to="/pricing">pricing page</Link> for the live price list.
        </p>
      </>
    ),
  },
  {
    heading: "Cancelling during the trial — no charge",
    body: (
      <>
        <p>
          You can cancel at any point in the {TRIAL_DAYS} days and you will not be charged at all. Cancelling stops
          the trial at its scheduled end: you keep full access until then, and the subscription simply ends instead of
          converting into a paid one.
        </p>
        <p>
          To cancel, open the <Link to="/pricing">pricing page</Link> and choose <strong>Manage billing</strong>. That
          opens Stripe's customer portal, where cancelling is one click and does not require an email to us.
        </p>
      </>
    ),
  },
  {
    heading: "If a payment is taken at the end of your trial",
    body: (
      <>
        <p>
          If the {TRIAL_DAYS}-day trial ends before you cancel, your first payment is taken automatically. If that
          payment was not what you intended, tell us within {TRIAL_DAYS} days of the charge and we will refund it in
          full — no questions about why.
        </p>
        <p>
          That {TRIAL_DAYS}-day refund window is the reason this page exists: the refund runs through the same period
          as the trial. Ask us at{" "}
          <a href={PRIVACY_CONTACT_HREF}>{PRIVACY_CONTACT_EMAIL}</a> with the email address on your account and the
          date of the charge. We confirm as soon as we have checked the payment, and a refund goes back to the card
          or wallet you paid with — usually within 5–10 working days, depending on your bank.
        </p>
      </>
    ),
  },
  {
    heading: "Renewals after the trial",
    body: (
      <>
        <p>
          Payments for renewals are not refundable — the trial window above covers the first payment only. You can
          cancel any time before a renewal, and your access continues to the end of the period you have already paid
          for.
        </p>
        <p>
          If something went wrong that was our fault (a duplicate charge, a plan activated twice, a payment taken after
          you cancelled), tell us and we will put it right regardless of the window above.
        </p>
      </>
    ),
  },
  {
    heading: "Cancelling and refunds for families",
    body: (
      <>
        <p>
          A parent or guardian who paid for a student's account can ask for a refund under exactly the same rules. If
          the account was created in error, or a child subscribed without permission, contact us and we will cancel and
          refund it.
        </p>
      </>
    ),
  },
  {
    heading: "Your statutory rights",
    body: (
      <>
        <p>
          Nothing on this page limits a right you have under the consumer law that applies to you. Where that law
          gives you a longer or stronger refund right than this policy, that right applies instead.
        </p>
        <p>
          This policy is part of the <Link to="/terms">Terms of Service</Link>. Questions about a charge are also
          welcome before you escalate it to your bank — a chargeback usually takes longer than asking us.
        </p>
      </>
    ),
  },
];

export function RefundPolicy() {
  return (
    <LegalShell
      path="/refunds"
      title="Refund Policy"
      updated={REFUND_LAST_UPDATED}
      version={REFUND_POLICY_VERSION}
      intro={`Every paid plan starts with a ${TRIAL_DAYS}-day free trial. Cancel during the trial and you pay nothing. If a payment is taken when the trial ends, ask us within ${TRIAL_DAYS} days of the charge and we refund it in full.`}
      sections={sections}
    />
  );
}

export default RefundPolicy;
