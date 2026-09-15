---
title: AI models
description: Add AI functionality to your v0 projects by integrating AI models and platforms.
product: v0
type: integration
prerequisites:
  - /docs/quickstart
related:
  - /docs/external-apis
  - /docs/databases
---

# AI models



v0 can build AI functionality into your projects by integrating with AI platforms or by using API keys for specific providers.
By default, v0 uses the [Vercel AI Gateway](https://vercel.com/ai-gateway) to connect to various AI models.

### Using the Vercel AI Gateway

To use the Vercel AI Gateway, no additional setup is required. v0 is pre-configured to connect to the gateway and access supported AI models.

### Marketplace integrations

v0 integrates with AI platforms like [fal](https://fal.ai/) and [Deep Infra](https://deepinfra.com/). You can also connect directly to [Grok by xAI](https://x.ai/grok).

From **Project menu** `...` → **Settings** → **Integrations**, you'll see supported providers. Click **Install** to open the Marketplace and accept click-through terms to activate an integration.

<Image alt="v0 integration options" src="/docs/light/ai-models.png" srcDark="/dark/ai-models.png" width={1082} height={1464} />

### APIs

To integrate with third-party AI models such as [OpenAI](https://openai.com/), you can add the necessary environment variables (e.g. `OPEN_AI_API_KEY`) from **Project menu** `...` → **Settings** → **Environment Variables**.

v0 will now use this variable when prompted to generate AI functionality.



---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
