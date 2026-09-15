---
title: Agentic features
description: v0's intelligent agent capabilities for web search, browser use, terminal commands, error fixing, and external tool integration.
product: v0
type: conceptual
prerequisites:
  - /docs/quickstart
related:
  - /docs/terminal-commands
  - /docs/pre-installed-agents
  - /docs/MCP
  - /docs/sandbox
---

# Agentic features



import { FREE_FIX_WITH_V0_LIMIT } from '@internal/shared/lib/free-fix-with-v0'

v0 is an intelligent agent that can autonomously perform complex tasks beyond generating code. It combines web search, browser use, error fixing, terminal commands, and external tool integration into a development assistant that acts on your behalf. Every action runs inside an isolated [sandbox](/docs/sandbox), and you control how much autonomy v0 has.

## Core Agent Capabilities

### Web search

v0 can search the web in real time when you ask about current information, documentation, or APIs. Results appear inline with clickable source links so you can verify them.

### Browser use

v0 can open the apps it builds, use them, critique designs, debug complex flows, and fix things proactively. While it works, v0 sends you screenshots of what it sees. It can also visit external URLs to capture visual references or inspect a page's layout before recreating it.

### Automatic error fixing

When v0 detects errors in your project, it can diagnose and fix them automatically as part of the generation loop.

**Types of errors it fixes:**

* Missing files and dependencies
* Code syntax and formatting issues
* Runtime errors and bugs
* Import and export problems

### Fix with v0

When a deployment has errors or warnings, a **Fix with v0** button appears in the deployment popover. Clicking it sends the error logs to v0, which diagnoses the issue and applies a fix automatically.

**Credits and free usage:**

* Premium, Team, Business, and Enterprise plans get up to <strong>{FREE_FIX_WITH_V0_LIMIT} free Fix with v0 uses per day</strong>. The button shows a "Free" badge when free uses are available.
* Free fixes apply to **unedited code** — if you've manually edited the source before clicking Fix, it uses credits.
* After the daily free cap is reached, Fix with v0 still works but consumes credits like a normal prompt.

See [Deployments — Troubleshooting](/docs/deployments#troubleshooting) for more on resolving deployment issues.

## External tool integration

### Marketplace integrations

v0 integrates with services from the [Vercel Marketplace](https://vercel.com/marketplace), including databases (Neon, Supabase, Upstash), payment providers (Stripe), and AI model platforms. Install and manage them from **Project menu** → **Settings** → **Integrations**. Marketplace integrations can also expose tools that v0 calls during generation to query your data, manage resources, or execute operations on your behalf.

### MCP servers

For services outside the Marketplace, v0 supports the [Model Context Protocol (MCP)](/docs/MCP). You can bring your own MCP servers (Linear, Notion, Sentry, and others) or choose from presets. MCP servers provide v0 with additional tools it can use during generation.

<LearnMore href="/docs/MCP" icon="arrow">
  Set up MCP integrations
</LearnMore>

## Terminal commands

v0 can run shell commands inside the [sandbox](/docs/sandbox) to test interactions, inspect your repo, run unit tests, and call platform CLIs like Vercel and GitHub. You control how much autonomy v0 has through three [permission modes](/docs/terminal-commands#permission-modes): Ask, Auto, and Full.

<LearnMore href="/docs/terminal-commands" icon="arrow">
  See what v0 can do in the terminal
</LearnMore>

## How agent capabilities work

v0's agent system works in the background to help you accomplish complex tasks. When you ask v0 to perform actions that require external information or tools, it automatically:

* **Coordinates multiple tasks**: Handles complex workflows involving multiple steps
* **Maintains context**: Remembers previous actions and results throughout the conversation
* **Provides real-time feedback**: Shows you what it's doing as it works
* **Handles errors gracefully**: Recovers from issues and tries alternative approaches

## User interface

### Real-time feedback

v0 shows you what it's doing as it works:

* **Progress indicators**: Live updates on each agent action
* **Browser screenshots**: Visual snapshots from browser use sessions
* **Citation links**: Clickable sources from web search results
* **Tool execution cards**: Status updates for terminal commands and external tool calls

### Agent control

You have full control over agent execution:

* **Stop**: Interrupt the agent at any time
* **Auto-continue**: v0 progresses through multi-step tasks automatically
* **Task visibility**: Each step the agent takes is visible in the chat

## Getting started

v0 picks the right capability based on what you ask:

* **"Search for the latest React best practices"** triggers a web search.
* **"Open my app and test the signup flow"** launches a browser use session.
* **"Check the latest Vercel deployment logs"** calls the Vercel CLI through the terminal.
* **"Connect to my Supabase database"** sets up a Marketplace integration.
* **"Run the unit tests and fix any failures"** uses the terminal.

v0 will automatically use the appropriate capabilities based on what you're asking for, with clear visual feedback showing what it's doing.

<LearnMore href="/docs/quickstart" icon="arrow">
  Get started with v0
</LearnMore>



---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
