---
title: Quickstart
description: An overview of v0's features and workflows
product: v0
type: overview
related:
  - /docs/text-prompting
  - /docs/code-editing
  - /docs/full-stack-apps
---

# Quickstart



Welcome to v0! This guide will walk you through v0's main features and workflows.

1. **Visit [v0.app](https://v0.app)** and sign in
2. **Start a new chat** or create a project
3. **Describe your idea** in natural language
4. **Review the generated app** and iterate as needed

## Prompt: Describe your idea

Start by describing what you want to build in your preferred language. v0 will generate a working application based on your description.

Try these simple prompts to get started:

* **"A todo app with add, edit, and delete functionality"**
* **"A landing page for a SaaS product with hero section and pricing"**
* **"A dashboard showing user analytics with charts"**
* **"A contact form that sends emails"**

<LearnMore href="/docs/text-prompting" icon="arrow">
  Learn more about text prompting
</LearnMore>

## Iterate: Refine your application

Once v0 generates your initial application, you can iterate and improve it through conversation.

### Edit the Code

1. **Switch to Code view** by selecting the **Code** tab in the preview toolbar
2. **Make direct edits** to the generated code
3. **Ask for changes** in natural language: "Add a search bar to the product list"

<LearnMore href="/docs/code-editing" icon="arrow">
  Learn more about code editing
</LearnMore>

### Design Mode

1. **Open Design mode** by selecting the **Design** tab in the preview toolbar
2. **Select elements** in the preview to tweak their styles visually or with natural-language instructions
3. **Click Apply** to commit your edits back to your source code as a new chat version

<LearnMore href="/docs/design-mode" icon="arrow">
  Learn more about design mode
</LearnMore>

## Integrate: Connect external services

Add real functionality to your application by integrating with databases, APIs, and external services.

Open **Project menu** `...` → **Settings** → **Integrations** to install integrations, or prompt v0 directly: "Connect a database to my app".

### Databases

Install database integrations from **Project menu** `...` → **Settings** → **Integrations**:

* **Neon** - Serverless PostgreSQL
* **Supabase** - PostgreSQL with auth and realtime
* **Upstash for Redis** - Serverless Redis
* **Blob** - File storage

<LearnMore href="/docs/databases" icon="arrow">
  Learn more about database integrations
</LearnMore>

### AI Models

v0 includes [Vercel AI Gateway](https://vercel.com/ai-gateway) integration, which automatically configures your API key using your Vercel account. This gives you access to hundreds of AI models through a single endpoint.

Install AI providers from **Project menu** `...` → **Settings** → **Integrations** with one click:

* **Grok** - xAI models
* **fal** - Image generation
* **Deep Infra** - Open source models

You can also use other third-party providers like OpenAI or Anthropic by prompting v0 and adding your API keys in **Vars**.

<LearnMore href="/docs/ai-models" icon="arrow">
  Learn more about AI integrations
</LearnMore>

### Payments

Add payment processing to your application:

* **Stripe** - Accept payments and manage subscriptions

### External APIs

1. **Describe the integration**: "Connect to Twilio for SMS notifications"
2. **v0 will generate** the necessary API calls and error handling
3. **The integration wizard** will prompt you to add your API keys after generation
4. **To edit or add keys manually**, open **Project menu** `...` → **Settings** → **Environment Variables**.

<LearnMore href="/docs/external-apis" icon="arrow">
  Learn more about API integrations
</LearnMore>

## Ship: Publish to production

Publish your application with Vercel from the **Publish** control in the chat header.

On the first publish:

1. Select **Publish**.
2. Confirm the Vercel project name if v0 needs to create one.
3. Choose the deployment visibility and domain.
4. If **Commerce mode** appears, review any unclaimed Stripe test sandbox or Shopify development store.
5. Select **Publish** and wait for the production deployment.

After more changes, open **Publish** and select **Publish Changes** to update the same production URL. If the project is connected to GitHub, v0 creates or reuses a pull request, merges it into the base branch, and deploys the result while respecting repository rules.

<LearnMore href="/docs/deployments" icon="arrow">
  Learn more about deployments
</LearnMore>

### Add a custom domain

Add a custom domain directly from v0:

* **On first publish**: Select a domain in the **Domains** step
* **From Settings**: Click **Project menu** `...` → **Settings** → **Domains**

Customize your default domain (your-domain.vercel.app) or connect a custom domain. You can also purchase domains via [Vercel Domains](https://vercel.com/domains).

<LearnMore href="/docs/custom-domains" icon="arrow">
  Learn more about custom domains
</LearnMore>

## Management and collaboration

Manage your projects and collaborate with your team.

### Project Settings

Use **Project menu** `...` → **Settings** to manage your project:

* **Vercel Project** - View your connected Vercel project and manage the visibility of Production deployments.
* **Integrations** - Connect and manage your project's integrations.
* **Environment Variables** - Manage your environment variables from Vercel.
* **GitHub** - Create a GitHub repository for your project.
* **Template** - Publish your project as a template.
* **Domains** - Manage your project's domains.
* **Analytics** - Enable Vercel analytics for project traffic insights.

Note that project settings are shared between all chats under the same project.

<LearnMore href="/docs/projects" icon="arrow">
  Learn more about projects
</LearnMore>

### Team collaboration

Use the **Invite** button in the chat header to open collaboration settings where you can:

* **Invite** individual team members.
* **Manage** team members' view and edit permissions.
* **Share** your chat with your team or anyone else.

<LearnMore href="/docs/teams" icon="arrow">
  Learn more about teams
</LearnMore>

<LearnMore href="/docs/pricing" icon="arrow">
  Learn more about pricing
</LearnMore>

## Next steps

Now that you understand the basics, try [building a simple app](https://v0.app) or explore the [community templates](https://v0.app/templates).

## Need help?

* **Community Forum**: Ask questions in the [community forum](https://community.vercel.com/tag/v0)
* **Vercel Support**: Contact support at [vercel.com/help](https://vercel.com/help)
* **X Community**: Join the [v0 community on X](https://x.com/i/communities/1863294272687980838)

<LearnMore href="https://v0.app" icon="arrow">
  Ready to start building?
</LearnMore>



---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
