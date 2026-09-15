---
title: Pricing
description: Understand the v0 plans, pricing, and usage limits.
product: v0
type: reference
related:
  - /docs/account
  - /docs/enterprise
---

# Pricing



v0 offers 5 plans:

* **Free**: No cost. For people looking to explore.
* **Premium**: $20/month. For higher limits and power users.
* **Plus**: $30/user/month. For fast moving teams and collaboration.
* **Business**: $100/user/month. For privacy conscious teams.
* **Enterprise**: For large companies that require additional security.

<Callout>
  The Premium plan is in the process of being sunsetted and is no longer
  available to new users.
</Callout>

## Plan comparison

| **Feature**         | **Free**   | **Premium**  | **Plus**       | **Business**    | **Enterprise**    |
| ------------------- | ---------- | ------------ | -------------- | --------------- | ----------------- |
| Price               | $0/month   | $20/month    | $30/user/month | $100/user/month | Custom            |
| Monthly Credits     | $5         | $20          | $30 per user   | $30 per user    | Custom            |
| Daily Message Limit | 7 messages | Credit-based | Credit-based   | Credit-based    | Credit-based      |
| Team Features         | No         | No           | Yes            | Yes             | Advanced controls |
| Shared Projects     | No         | No           | Yes            | Yes             | Yes               |
| Shared Credit Pool  | No         | No           | Yes            | Yes             | Yes               |
| Access Controls     | No         | No           | Basic          | Basic           | RBAC              |
| Centralized Billing | No         | No           | Yes            | Yes             | Yes               |
| Usage Analytics     | Basic      | Basic        | Team-wide      | Team-wide       | Advanced          |
| Data Opt-out        | No         | No           | No             | Yes             | Yes               |
| SAML SSO            | No         | No           | No             | No              | Yes               |
| Priority Access     | No         | No           | No             | No              | Yes               |

[Choose your plan →](https://v0.app/pricing)

## How do credits work?

Credits function like a prepaid balance:

* Each plan includes a monthly credit allowance.
* Generations draw from your credit balance.
* When credits are used up, generation pauses.
* You can buy more credits any time (Premium, Plus, and Business plans).
* Unused monthly credits roll over to the next billing cycle and expire after 65 days.
* Purchased credits remain in your balance when your subscription expires, but they require an active paid plan to use and expire one year after purchase.

### Shared Credit Pool (Plus, Business, and Enterprise)

On Plus, Business, and Enterprise plans, Shared Credit Pool credits are shared among all team members:

* Monthly credits are still individual per user
* Shared Credit Pool credits are shared across the team
* Shared Credit Pool credits are used after individual monthly credits are exhausted
* Shared Credit Pool credits expire one year after purchase

## What are tokens?

Tokens are the units used to measure how much text is processed:

* **Input tokens** come from your prompt or uploaded content.
* **Output tokens** are what v0 generates in response.

Each time you use v0, your input and the generated output are split into tokens and counted. Token usage varies based on the length of your input and the size of the output. Longer prompts or more detailed responses will use more tokens.

v0 also includes all relevant context like chat history, source files, and Vercel-specific knowledge when generating responses. This context is counted as input, and higher-quality responses may use more tokens as a result.

## Model Pricing

The number of tokens per credit used depends on the model. You can view model costs by hovering each in the model selector or from the [**pricing page**](https://v0.app/pricing).

## Usage and billing

You can monitor your usage and manage billing in your v0 dashboard:

* [**Usage**](https://v0.app/settings/usage): Your credit consumption and activity, grouped by project or chat. On eligible team plans, Owners and members with the Billing role can also review team-wide credit and activity data by member or project.
* [**Billing**](https://v0.app/settings/billing): Your current plan, credit balances and expiry dates, payment method, and invoices.

<LearnMore href="/docs/usage-dashboard" icon="arrow">
  Learn more about the Usage & Activity dashboard
</LearnMore>

## Credit purchase options

Premium, Plus, and Business plans can purchase additional credits at any time. Enterprise accounts should contact their Account Executive to organise additional credit purchases.

## Best practices

* Be specific in your prompts to reduce iterations. See our [prompting guide](https://vercel.com/blog/how-to-prompt-v0) for tips.
* Break large projects into smaller components.
* Use server components for better performance.
* Monitor your credit usage regularly.



---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
