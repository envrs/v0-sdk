---
title: Text Prompting
description: Use text prompting to create initial UIs and ask technical questions with natural language.
product: v0
type: guide
prerequisites:
  - /docs/quickstart
related:
  - /docs/code-editing
  - /docs/instructions
---

# Text Prompting



Start simple. Plan your project. Provide context. Specify and make v0 clarify. Iterate.

## Voice input

You can dictate prompts using your voice instead of typing. Click the **microphone icon** in the prompt bar to start recording, then click the **checkmark** to transcribe your audio. Your speech is converted to text and inserted into the prompt editor, where you can review or edit it before sending. Voice input requires being signed in.

## Basic Examples

Start with simple, descriptive prompts. For example:

* "A dashboard with a login page and user profile view"
* "A landing page for a mobile app with a hero section, features grid, and pricing table"
* "An internal tool to manage customer support tickets"
* "A product feedback form that writes to a database"

## Development Workflow

### Simple Projects (Direct Implementation)

For straightforward applications with clear requirements, start directly with implementation. This approach works well for single-purpose tools, landing pages, or simple CRUD applications.

<PromptLink text="Build a task management app using Next.js 14 with App Router, TypeScript, and Tailwind CSS" />

<PromptLink text="Create a contact form with validation and email integration" />

### Complex projects (planning first)

For multi-feature applications, enterprise tools, or systems with multiple user roles, start with planning. This helps ensure you don't miss critical requirements and creates a roadmap for development.

#### 1. Requirements gathering

Define what you're building and who will use it:

<PromptLink text="Create a PRD for a restaurant reservation system" />

<PromptLink text="Generate user personas for a fitness tracking app" />

#### 2. Implementation

Build the core functionality based on your requirements:

"Build the MVP based on the PRD, starting with core features."

#### 3. Iteration

Add features and refinements based on your initial implementation:

"Add search functionality and pagination to the task list."

"Implement real-time updates using WebSockets."

## Best Practices

### Be Specific

The more specific your prompt, the better the results. Include details about functionality, design preferences, and technical requirements.

**Instead of:** `"Make a website"`

**Try:**

<PromptLink text="Create a portfolio website for a freelance designer with hero section, projects showcase, contact form, and responsive design" />

### Break down complex tasks

Large, complex applications are better built incrementally. This approach reduces errors, allows for testing at each stage, and makes debugging easier.

**Too Complex:**

<PromptLink text="Create a full e-commerce platform with authentication, catalog, cart, payments, orders, admin dashboard, and analytics" />

**Better Approach:**

<PromptLink text="Start with a product catalogue page showing products in a grid layout" />

Then follow up:

<PromptLink text="Add a shopping cart with localStorage persistence" />

### Include technical details

Specify your preferred technologies, frameworks, and integrations. This helps v0 generate code that matches your existing stack or preferences.

<PromptLink text="Build a real-time chat app using: - Next.js 14 with App Router - Socket.io for messaging - MongoDB for storage - NextAuth.js for authentication" />

### Specify UI/UX preferences

Include design preferences to get results that match your vision. Consider factors like color schemes, layout preferences, and user experience requirements.

<PromptLink text="Design a minimal, dark-mode interface with mobile-first responsive layout" />

### Include error handling

Robust applications need proper error handling. Specify how you want to handle common failure scenarios to ensure a good user experience.

<PromptLink text="Add comprehensive error handling for network failures, invalid input, and empty states" />

<PromptLink text="Implement loading states and user-friendly error messages" />

## Advanced techniques

### Ask v0 to plan

When you're unsure how to approach a complex project, let v0 help you break it down. This is especially useful for projects with multiple stakeholders or complex business logic.

<PromptLink text="Break down the development of a social media dashboard into smaller steps" />

### Component-first development

Build your application piece by piece, starting with individual components. This approach gives you more control over each part and makes debugging easier.

<PromptLink text="Create a header component with navigation and logo" />

Then: "Add a hero section below the header"

### Progressive enhancement

Start with core functionality and gradually add features. This approach ensures your application works at every stage and helps you prioritize features based on user feedback.

1. **Core Features:** `"Create a basic todo list with add/delete"`
2. **Data Persistence:** `"Add localStorage to save todos"`
3. **User Experience:** `"Add completion checkboxes and filtering"`

### Prompt templates

Use these templates as starting points for common development patterns. Customize them based on your specific requirements.

#### CRUD operations

<PromptLink text="Create a resource management interface with list view, add/edit forms, delete confirmation, and search/pagination" />

#### Authentication

<PromptLink text="Implement [auth method] with login/register forms, password reset, session management, and protected routes" />

#### Dashboards

<PromptLink text="Build a dashboard widget showing [metric] with current value, trend indicator, comparison data, and interactive chart" />

## Complete example workflow

Here's how to build a customer support ticket system from start to finish. This example shows the progression from planning to a fully functional application.

### 1. Planning

<PromptLink text="Create a PRD for a customer support ticket system with agent dashboard and customer portal" />

### 2. Core implementation

<PromptLink text="Build the ticket creation form with priority levels, categories, and file uploads" />

### 3. Agent features

<PromptLink text="Add the agent dashboard with ticket list, status updates, and response interface" />

### 4. Enhancements

<PromptLink text="Implement real-time notifications and email alerts for ticket updates" />

## Prompt queuing

You can queue up to **10 prompts** while v0 is still generating a response. Queued prompts run automatically in order once the current generation finishes, so you don't have to wait between each step. You can reorder, edit, or remove queued prompts before they run. This is useful for planning multi-step workflows — for example, you can queue "add authentication", "connect the database", and "add a settings page" all at once and let v0 work through them sequentially.

## Technical questions

v0 is trained on the latest Vercel ecosystem documentation and can answer questions about:

* **[Next.js](https://nextjs.org/)** - React framework for production
* **[Svelte](https://svelte.dev/)** - Cybernetically enhanced web apps
* **[Turborepo](https://turbo.build/repo)** - High-performance build system
* **[AI SDK](https://sdk.vercel.ai/)** - AI-powered applications
* **[Vercel](https://vercel.com/)** - Cloud platform for frontend developers

### Example queries

Use v0 to get specific answers about implementation details, best practices, and troubleshooting:

* "How do I implement server-side rendering in Next.js 14?"
* "What's the best way to handle authentication in SvelteKit?"
* "How can I optimize my Turborepo build performance?"

## Next steps

Once you've generated your initial application:

* **[Design Mode](/docs/design-mode)** - Refine the visual design and layout
* **[Code Editing](/docs/code-editing)** - Make direct code changes
* **[Deployment](/docs/deployments)** - Deploy your application to Vercel



---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
