---
title: Deployments
description: Preview and publish v0 projects on Vercel, then manage domains, visibility, and production updates.
product: v0
type: guide
prerequisites:
  - /docs/quickstart
related:
  - /docs/custom-domains
  - /docs/vercel-integration
  - /docs/github
  - /docs/projects
---

# Deployments



import { FREE_FIX_WITH_V0_LIMIT } from '@internal/shared/lib/free-fix-with-v0'

v0 deploys projects to Vercel. Working branches get preview deployments for review, while publishing updates the Vercel project's production deployment and stable production URL.

## Preview and production deployments

* **Preview deployments** are built from working branches. They have unique URLs and do not change the project's production URL.
* **Production deployments** serve the project's domains. Publishing promotes the current work through the project's configured Git and Vercel workflow.

For a GitHub-backed project, open the branch button next to **Publish** to inspect the working branch's preview. The menu shows deployment status, the branch diff, pull request, and CI checks. For a project without GitHub, open **Publish** to inspect the latest deployment.

## First publish

Select **Publish** in the chat header. The first-publish flow guides you through the setup the project needs:

1. **Create project:** Confirm the Vercel project name if the chat is not already connected to one.
2. **Visibility:** Choose who can access the deployed app. Available choices depend on your team's plan and deployment protection settings.
3. **Domains:** Confirm the provided `vercel.app` domain, select a connected custom domain, or open Vercel to add one.
4. **Commerce mode, when needed:** Review unclaimed Stripe test sandboxes or Shopify development stores and choose whether to claim them before publishing.
5. **Publish:** Start the production deployment.

Every Vercel project has a stable production URL. Future production deployments update the app at that URL without changing it.

## Publish updates

After making another code change:

1. Open **Publish**.
2. Review the production deployment and selected domain.
3. Select **Publish Changes**.

For GitHub-backed projects, Publish creates or reuses a pull request, merges it into the chat's base branch, and waits for the production deployment. GitHub branch protection still applies. See [GitHub → Publish GitHub changes](/docs/github#publish-github-changes).

Projects without GitHub deploy the chat's current code directly to the connected Vercel project.

## Deployment status and actions

The deployment card reports live build progress and the final state. Depending on the deployment, it also links to:

* The deployed site
* The commit or working branch
* The deployment inspector in Vercel
* Build logs and errors

For GitHub-backed projects, the branch menu also reports CI and pull-request state. Its v0 action changes with the current problem: **Review Code**, **Fix Build**, **Fix CI**, **Fix Conflicts**, or **Fix CI + Conflicts**.

## Domains and visibility

You can change deployment settings from v0:

* Open **Project menu** `...` → **Settings** → **Domains** to manage project domains.
* Open **Project menu** `...` → **Settings** → **Vercel Project** to manage production visibility.
* During the first publish, choose visibility and a domain in the publish flow.

Advanced DNS configuration, redirects, and other domain settings open in the Vercel dashboard. See [Custom domain](/docs/custom-domains).

## Advanced deployment settings

Open the deployment's inspector link to manage the Vercel project, including:

* Build and deployment settings
* Environment variables for Production, Preview, and Development
* Deployment Protection and Vercel Authentication
* Web Analytics and Speed Insights
* Runtime logs and observability
* Rollbacks and redeployments

See [Vercel project configuration](https://vercel.com/docs/projects/project-configuration) for the full set of controls.

## Deployment policies

Teams can configure [Deployment Policies](https://vercel.com/docs/deployments/deployment-policy) that restrict which Git sources and deployment mechanisms can create deployments. If a policy blocks v0 for the target environment, a team Owner must allow the source at the team level or override the policy for the project.

## Troubleshooting

### A preview or production build fails

When a deployment has errors or warnings, select **Fix with v0** or **Fix Build**. v0 reads the relevant logs, diagnoses the failure, and applies a fix. On paid plans, you get up to {FREE_FIX_WITH_V0_LIMIT} free uses per day on unedited code; after that, fixes cost credits like a normal prompt. See [Agentic Features → Fix with v0](/docs/agentic-features#fix-with-v0).

If needed, ask v0 to revert the change or restore an earlier chat version, then publish again.

### A GitHub publish is blocked

Open the branch menu to inspect CI and the pull request. v0 can address actionable CI failures and merge conflicts. Required reviews and other human approval rules must be completed in GitHub before you publish again.

### Publish is disabled by your team

Check the team's [deployment policy](#deployment-policies) and your Vercel project permissions. Publishing also requires a v0 role that can edit the chat and permission to deploy to the connected Vercel project.

### The expected domain is missing

Open **Project menu** `...` → **Settings** → **Domains** and confirm the domain belongs to the connected Vercel project. Unverified domains must be verified in Vercel before you can select them.

## Next steps

* [Connect GitHub and publish through branches](/docs/github)
* [Add a custom domain](/docs/custom-domains)
* [Configure environment variables](https://vercel.com/docs/environment-variables)
* [Set up Web Analytics](https://vercel.com/docs/analytics)



---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
