# @v0-sdk/vercel

Complete TypeScript client and AI SDK tools for the Vercel Platform API.

## Installation

```bash
npm install @v0-sdk/vercel
# or
pnpm add @v0-sdk/vercel
# or
yarn add @v0-sdk/vercel
```

## Quick Start

### Using the Vercel Client

```typescript
import { createVercelClient } from '@v0-sdk/vercel'

const vercel = createVercelClient(process.env.VERCEL_API_TOKEN)

// List projects
const { projects } = await vercel.listProjects()

// Get a specific project
const project = await vercel.getProject('my-project')

// Create a project
const newProject = await vercel.createProject({
  name: 'my-new-project',
  framework: 'nextjs',
})

// List deployments
const { deployments } = await vercel.listDeployments('my-project')

// Get deployment details
const deployment = await vercel.getDeployment('dpl_123abc')

// Set environment variables
await vercel.upsertEnv('my-project', {
  API_KEY: 'secret-key',
  DATABASE_URL: 'postgres://...',
})

// Create a domain
await vercel.createDomain('example.com', 'my-project')

// Get deployment logs
const { logs } = await vercel.getDeploymentLogs('dpl_123abc')
```

### Using with AI SDK

```typescript
import { generateText } from 'ai'
import { createVercelTools } from '@v0-sdk/vercel'

const tools = createVercelTools({
  apiToken: process.env.VERCEL_API_TOKEN,
})

const result = await generateText({
  model: 'openai/gpt-4',
  prompt: 'Deploy my application to Vercel',
  tools,
})
```

## API Reference

### VercelClient

The main client for interacting with Vercel Platform API.

#### Constructor

```typescript
new VercelClient({
  apiToken: string      // Required: Vercel API token
  teamId?: string       // Optional: Team ID for team-scoped operations
  baseURL?: string      // Optional: Custom API base URL (default: https://api.vercel.com)
})
```

#### Projects

- `listProjects(options?)` - List all projects
- `getProject(projectIdOrName)` - Get project details
- `createProject(options)` - Create a new project
- `deleteProject(projectIdOrName)` - Delete a project

#### Deployments

- `listDeployments(projectIdOrName, options?)` - List project deployments
- `getDeployment(deploymentId)` - Get deployment details
- `createDeployment(projectIdOrName, options)` - Create a deployment
- `deleteDeployment(deploymentId)` - Delete a deployment
- `getDeploymentLogs(deploymentId, options?)` - Get deployment logs
- `getDeploymentEvents(deploymentId)` - Get deployment events

#### Environment Variables

- `getEnv(projectIdOrName)` - Get project environment variables
- `upsertEnv(projectIdOrName, variables)` - Create or update environment variables
- `deleteEnv(projectIdOrName, envId)` - Delete an environment variable

#### Domains

- `listDomains(projectIdOrName?)` - List domains
- `createDomain(domain, projectIdOrName)` - Create a domain
- `removeDomain(domain)` - Remove a domain
- `getDomainConfig(domain)` - Get domain DNS configuration

#### Aliases

- `listAliases(projectIdOrName)` - List deployment aliases
- `createAlias(deploymentId, alias)` - Create an alias for a deployment
- `deleteAlias(alias)` - Delete an alias

#### Analytics

- `getAnalytics(deploymentId, options?)` - Get deployment analytics

## AI SDK Tools

The package exports AI SDK tools for use with the Vercel AI SDK. Available tools:

- `listProjects` - List all projects
- `getProject` - Get project details
- `createProject` - Create a new project
- `listDeployments` - List project deployments
- `getDeployment` - Get deployment details
- `createDeployment` - Create a new deployment
- `getDeploymentLogs` - Get deployment logs
- `getProjectEnv` - Get project environment variables
- `setProjectEnv` - Set project environment variables
- `listDomains` - List domains
- `createDomain` - Create a domain
- `getAnalytics` - Get deployment analytics

## Error Handling

The client throws errors for failed API requests. Always wrap calls in try-catch:

```typescript
try {
  const project = await vercel.getProject('my-project')
} catch (error) {
  console.error('Failed to fetch project:', error.message)
}
```

## Environment Variables

Set the following environment variables:

```bash
VERCEL_API_TOKEN=your_api_token_here
VERCEL_TEAM_ID=your_team_id_optional
```

## Types

All TypeScript types are exported from the package:

```typescript
import type {
  VercelProject,
  VercelDeployment,
  VercelDomain,
  VercelEnvVariable,
  CreateProjectOptions,
  CreateDeploymentOptions,
  AnalyticsOptions,
} from '@v0-sdk/vercel'
```

## License

Apache 2.0
