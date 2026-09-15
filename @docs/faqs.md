---
title: FAQs
description: Common questions about what v0 is, how it works, and how to build with it.
product: v0
type: troubleshooting
related:
  - /docs/quickstart
  - /docs/pricing
---

# FAQs



*Last Updated: March 17, 2026*

*Effective Date: March 31, 2026*

## New v0 Update

*Released: February 4, 2026*

**What's different about v0 now?**

This is a major update with four main changes:

1. **Git integration**: You can import existing GitHub repositories, and v0 handles branching and commits automatically. Create and merge pull requests without leaving v0.
2. **Projects**: Projects connect chats to your actual app, including deployments, environment variables, and domains. Multiple chats can contribute to the same Vercel Project.
3. **Full editor**: A complete VS Code-style editor is built into v0. Editor, AI agent, previews, and configuration all live in one place.
4. **Improved previews**: Previews now run your code exactly as it would in production. They're more accurate, support larger projects, and work with server-side features like API routes and databases.

### Do I need to do anything to access the new features?

No. The new features are available in your account.

### Do I have to use Git?

No. Git integration is optional. You can use v0 without connecting to GitHub.

### What can I do with Git in v0?

When you connect a chat to GitHub:

* v0 creates a working branch when the chat first has a code change to push (e.g., `v0/main-abc123`)
* Every code change creates an automatic commit
* You can create a pull request directly from v0
* Publish creates or reuses the pull request, merges it, and starts the production deployment
* The branch menu shows the preview, diff, pull request, and CI checks
* v0 never pushes directly to `main`

### I used the previous Git integration. What changed?

The new workflow is fully automatic. No manual commits or branch management required.

### Why can't I push directly to main?

By design, v0 protects your main branch. Changes go through pull requests so your production code stays safe.

### How do previews work now?

Previews now run your full application exactly as it would in production. This means server-side code, API routes, database connections, and environment variables all work in the preview. What you see is what you'll get when you deploy.

Under the hood, v0 uses [Vercel Sandbox](https://vercel.com/blog/vercel-sandbox-is-now-generally-available)—a lightweight virtual machine that runs your app in an isolated environment. This replaces the previous browser-based preview, which had limitations with server-side features.

### Can I work on my existing codebase?

Yes. You can import a GitHub repository and work on it directly in v0.

### Do I need Vercel?

For the full experience (environment variables, deployments, previews), your GitHub repo should be connected to a Vercel project. You can still export code and deploy elsewhere.

### What if I want to start something new from scratch?

Works the same as before. Start a new chat and begin prompting.

### What types of projects can I work on in v0?

Web apps, dashboards, e-commerce, SaaS, AI-powered apps, data visualizations, 3D projects, and AI agents. v0 uses Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui.

### Did anything change with the pricing?

No. Pricing remains the same: [v0.app/pricing](https://v0.app/pricing)

### How do I import a project?

Click the + icon in the prompt bar at v0.app. You can "Upload from computer" (zip file) or "Import from GitHub".

### How do I connect my GitHub repository in v0?

Open **Project menu** `...` → **Settings** → **GitHub**. More details: [v0.app/docs/github](https://v0.app/docs/github)

### What if I want to collaborate with someone using Cursor or Claude Code?

Connect your v0 project to the same GitHub repository. When they push changes, you pull. When you merge a PR from v0, they pull.

### How do I publish a change?

Select **Publish** in the top right. For a project without GitHub, v0 deploys the current chat to the connected Vercel project. For a GitHub-backed project, v0 creates or reuses the chat's pull request, merges it into the base branch, and waits for the production deployment. Required GitHub checks and reviews still apply.

### Why is the publish button disabled?

The button activates when the chat has changes to publish and you have permission to deploy the connected Vercel project. Ask v0 to make a small code change, then check the branch or Publish menu for its push and deployment status.

### How do I publish without GitHub?

If you're not connected to GitHub, you can publish directly using the Publish button.

### Why can't I create a new branch in v0?

Check that you're connected to GitHub correctly and the branch name isn't duplicated. If the error persists, contact [Vercel support](https://vercel.com/help).

### How do I open a pull request without getting an error?

Check your GitHub connection is active and the repository is accessible. If the error persists, contact [Vercel support](https://vercel.com/help) with the error details.

### Does the project structure affect my deployment URLs?

No. Your deployment URLs remain the same.

### Why do v0 agents keep failing and consuming my credits?

The v0 agent is constantly improving. If you're experiencing repeated failures, please send us feedback so we can investigate.

### How do I understand my v0 usage costs and token consumption on the Pro plan?

Go to your usage settings: [v0.app/settings/usage](https://v0.app/settings/usage)

### How do I set up internationalization (i18n) in v0?

v0 runs on Next.js, so you can use Next.js i18n patterns. The recommended library is `next-intl`. Check the Next.js docs for implementation details.

### Why does my preview look different than before?

Previews now render your code more accurately, matching how it will appear in production. If something appears broken (not just different), please report it.

### Why does v0 feel slower?

Previews now run real builds of your application, which takes a bit more time than before. Performance should still be fast. If it's unusably slow, that's a bug—please report it.

### Why can't I import my repository?

To import a GitHub repository, you need:

* A GitHub account connected to v0
* Access to the repository you're trying to import

If you're on a team, check that you have the right permissions. For private repos, make sure v0 has been granted access via your GitHub settings. If you don't have an existing Vercel project connected to that GitHub repo, v0 creates a new project.

### Why aren't my environment variables working?

Environment variables are managed via Vercel, and you can follow **Project menu** `...` → **Settings** → **Environment Variables** to verify them.

### How do I know which chat is connected to which Project?

The connected Project appears at the top of each chat. You can also view all Projects and their connected chats in the Projects tab in the sidebar.

<LearnMore href="https://v0.app/changelog" icon="arrow">
  View the full changelog
</LearnMore>

<LearnMore href="https://v0.app/chat/projects" icon="arrow">
  Go to Projects
</LearnMore>

## About v0

### What is v0?

v0 is an AI-powered development platform that turns ideas into production-ready, full-stack web apps. Through a conversational chat interface, it generates sophisticated UIs and backend logic from natural language, taking you from prompt to production in minutes.

v0 empowers anyone to build functional web applications faster without writing code manually. It supports popular frontend frameworks and UI libraries, with best-in-class expertise in Next.js, React, Tailwind CSS, shadcn/ui, and the AI SDK. The code generated is ready to deploy on Vercel's globally scalable infrastructure.

## How does v0 work?

v0 supports the full development lifecycle from idea to production. Check out the [Quickstart](https://v0.app/docs/quickstart) guide to start building on v0.

* **Prompt**: Describe what you want, upload screenshots or mockups, or import Figma designs. v0 transforms any input into working code.
* **Iterate**: Add features, adjust visuals in Design Mode, edit code, or apply your design system for consistent branding.
* **Integrate**: Connect databases, AI models, external APIs, and GitHub to build full data-driven applications.
* **Ship**: Publish with one click on Vercel, add domains, and share with your team.
* **Manage**: Collaborate in shared workspaces with permissions, security controls, and usage insights.

### Who can use v0?

Anyone with an idea. v0 removes technical barriers and enables a new class of creators who build and collaborate without writing code.

* **Founders** ship MVPs quickly and iterate with speed.
* **Product managers** prototype without waiting on design queues.
* **Designers** test real interactions early.
* **Engineers** skip boilerplate code and develop faster.
* **Sales engineers** produce custom demos instantly.
* **Marketers** launch pages independently.

### Do I need coding knowledge?

No coding experience is required. Describe what you want using natural language and v0 will handle the technical implementation.

### Do I need to write prompts in English?

No. You can write prompts in your preferred language and v0 will respond in the same language and transform your ideas into code.

### Why should I choose v0?

v0's deep integration with the Vercel ecosystem powers the complete workflow from prompt to production.

* **vs. General LLMs:** v0 generates interactive UIs and deployable full-stack apps, not isolated code snippets.
* **vs. AI-Augmented IDEs:** v0 provides a collaborative, conversational environment where PMs, designers, engineers, and other professionals can build together across the full product development cycle.
* **vs. Code Generation Products:** v0 delivers best-in-class Next.js expertise backed by Vercel's enterprise infrastructure and security, unlike standalone tools without proven production infrastructure.
* **vs. AI-Powered Design Tools:** v0 generates production-ready code with backend logic and deployment, not prototype only designs.

## Building with v0

### What can I build with v0?

You can build anything, from simple components to full-stack applications. For example:

* Landing pages
* Dashboards
* E-commerce sites
* Data visualization tools
* Internal tools
* Mobile-responsive apps

<LearnMore href="https://v0.app/community" icon="arrow">
  Explore what our community is building
</LearnMore>

### Can v0 build full-stack or complex applications?

Yes. v0 handles everything from simple components to full-stack apps with authentication, databases, and external API integrations.

### Can I use my own designs?

Yes. Upload screenshots, mockups, or Figma designs. v0 converts them into working applications with pixel-perfect accuracy.

<LearnMore href="https://v0.app/docs/figma" icon="arrow">
  Learn more about Figma
</LearnMore>

### Which version of AI SDK does v0 use?

v0 uses AI SDK version 6 by default. When building AI-powered applications, v0 follows AI SDK 6 patterns for chat, streaming, tool calling, and structured data generation.

### Can v0 integrate with existing projects?

Yes. You can import existing projects into v0 via an existing GitHub repository, Vercel project, or ZIP files.

### Is v0 available on mobile? What features are available?

Yes. v0 has a dedicated iOS app that lets you prompt, generate, and iterate on projects directly from your iOS device. You can start new chats, continue existing conversations, preview generated UIs, manage environment variables, connect to GitHub, and share your work — all from a mobile-optimized interface. You can also set up database integrations and select MCP servers for your chats. Adding or configuring new MCP server presets is currently handled on desktop.

<LearnMore href="https://v0.app/ios" icon="arrow">
  Download the v0 iOS app
</LearnMore>

### What can I build on v0 mobile?

You can build a wide range of AI-powered apps, agents, and tools directly from your phone, such as landing pages, dashboards, meeting agenda builders, event brief agents, and data-driven apps. For workflows that require configuring new MCP integrations, we recommend using desktop.

### Can I use v0 offline?

No. v0 requires an internet connection to process prompts and generate code.

### Is my code secure?

Yes. v0 follows secure coding best practices, and deployed apps benefit from Vercel's enterprise-grade infrastructure.

### How much does v0 cost?

v0 offers 5 plans:

* **Free**: No cost. For people looking to explore.
* **Premium**: $20/month. For higher limits and power users.
* **Plus**: $30/user/month. For fast moving teams and collaboration.
* **Business**: $100/user/month. For privacy conscious teams.
* **Enterprise**: For large companies that require additional security.

See the [pricing page](https://v0.app/pricing) for more information.

<Callout>
  The Premium plan is in the process of being sunsetted and is no longer available to new users.
</Callout>

## Editing and Collaborating

### Can I edit the generated code?

Yes. Export the code to work locally or edit directly in v0. The bi-directional [GitHub integration](https://v0.app/docs/github) allows seamless syncing between local development and v0.

### Can teams collaborate in v0?

Yes. The Plus, Business, and Enterprise plans enable multiple users to work on projects together. Share projects, iterate on designs, and deploy from a shared workspace.

## Deploying and infrastructure

### How do I deploy my application?

Click **Publish** in the top-right of the chat, then click **Publish to Production**. Your application goes live on [Vercel's platform](https://vercel.com/), with no setup or configuration needed.

### What is Vercel's relationship with v0?

Vercel created v0 and provides the underlying infrastructure. The deep integration enables one-click deployment to enterprise grade infrastructure, with SOC 2 Type 2 compliance, strong security, and global scalability. v0's code is optimized for the Vercel platform, ensuring a smooth path from idea to production.

<LearnMore href="https://vercel.com/" icon="arrow">
  Learn more about Vercel
</LearnMore>

<LearnMore href="/docs/vercel-integration" icon="arrow">
  Learn more about how v0 syncs with Vercel
</LearnMore>

### Do I need a new v0 account if I already have a Vercel account?

No. Your Vercel account will give you access to v0. Just go to [v0.app](http://v0.app/) and log in!

## Training data

### What data was v0 trained on?

Vercel uses a combination of public and private data sets to provide v0. v0 was trained on a large corpus of data from various sources, including third parties listed in Vercel's [AI Policy](https://v0.app/policy). The data sets primarily cover areas related to web development, particularly with React, Next.js, and modern web technologies.

### Will my generations be used for training?

v0 may use user-generated prompts and/or content as inputs to models and learning systems from third-party providers to improve our products. Using this data gives v0 the ability to provide more accurate and relevant recommendations to our users.

Content of v0 Enterprise customers, or any customer that has opted out of model training in their Vercel settings, is not used for training.

Further, customer data or code of customers using Vercel's platform services is not used to train, improve, or fine tune the models used by v0.

### Can I access my data?

Yes, you can download your user-generated prompts and/or content through your account.

### Is v0 trained on customer data from Vercel's platform services, like the DX Platform?

No data related to your usage of Vercel's platform, Vercel CLI, or Vercel's deployment services is or will be used to train v0 if you have opted out of model training in your Vercel team settings.
Please refer to this [changelog](https://vercel.com/changelog/updates-to-terms-of-service-march-2026)  for more information.

### Can I see a history of all my chats?

Yes, you can view your chat history at [v0.app/chats](http://v0.app/chats).

### Can we request deletion of data?

Yes, please [contact us](mailto:privacy@vercel.com?Subject=Please%20delete%20my%20v0%20data) to request deletion of v0 outputs.

Please note that if any or your inputs and outputs were used to train existing v0 models, those models will not be updated.

If you prefer for all of your content to not be used for training, please change your Vercel team's [data preferences](https://vercel.fyi/team-data-preferences).

To request deletion of your personal data under data protection regulations, please see Vercel's [Privacy Notice](https://vercel.com/legal/privacy-policy#eea-and-uk).

### Can I use output from v0 for commercial uses?

Vercel doesn't own the code generated based on your queries and prompts.

However, output that you receive may be the same or similar to other users' output or third party's IP, be incomplete or contain bugs, or be inappropriate for your use. You are responsible for evaluating any content you generate through v0 and making your own determination about its suitability for commercial or other purposes.

### Is v0 compliant?

Vercel has a SOC 2 Type 2 attestation for Security, Confidentiality, and Availability. v0 is included in the scope of Vercel's SOC 2 report. More information is available at [security.vercel.com](https://security.vercel.com).

## What if I need help?

If you run into issues or have further questions, you can:

* Browse the documentation (you are here).
* Join the discussion in the [community forum](https://community.vercel.com/tag/v0).
* Contact support at [vercel.com/help](https://vercel.com/help).



---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
