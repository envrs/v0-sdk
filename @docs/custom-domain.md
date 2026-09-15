---
title: Custom domain
description: Add custom domains to your v0 deployments to give your applications a professional, branded URL.
product: v0
type: guide
prerequisites:
  - /docs/deployments
related:
  - /docs/deployments
  - /docs/vercel-integration
---

# Custom domain



v0 provides all deployments with a unique `vercel.app` URL, but you can add custom domains to give your applications a professional, branded web address.

Once you have a deployment available, you can add a custom domain directly from the v0 interface:

## Step 1: Access the Domains menu

You can access your project's domains settings from either:

* **Publish** → **Customize Domain**
* **Project menu** `...` → **Settings** → **Domains**

## Step 2: Choose your domain option

When you click **Add**, you'll have two main options:

### Option A: Use an available `.vercel.app` domain

* Select from available `.vercel.app` domains
* These are free and instantly available
* Perfect for testing and development
* Automatically configured with HTTPS

### Option B: Add your own custom domain

* Enter your own domain name (e.g., `myapp.com`)
* Requires DNS configuration with your domain registrar
* Provides professional branding
* Full control over your domain

## Configuring your own custom domain

If you choose to use your own domain, you'll need to configure it through the Vercel console:

1. **Click "Inspect on Vercel"** from the Publish menu
2. **Follow the detailed instructions** in the Vercel dashboard
3. **Configure DNS records** with your domain registrar

For complete instructions on setting up custom domains, including DNS configuration and domain management, see the [Vercel documentation on adding domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain).

## Next steps

* [Learn about deployments](/docs/deployments)
* [Explore Vercel's domain features](https://vercel.com/docs/domains)



---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
