import { tool } from 'ai'
import { z } from 'zod'
import { VercelClient, VercelClientOptions } from '../client'

/**
 * Creates Vercel Platform AI SDK tools for deployment and project management
 */
export function createVercelTools(options: VercelClientOptions) {
  const client = new VercelClient(options)

  const listProjects = tool({
    description: 'List all Vercel projects',
    inputSchema: z.object({
      limit: z
        .number()
        .optional()
        .describe('Maximum number of projects to return'),
    }),
    execute: async (params) => {
      const result = await client.listProjects({
        limit: params.limit,
      })

      return {
        projects: result.projects.map((p) => ({
          id: p.id,
          name: p.name,
          createdAt: new Date(p.createdAt).toISOString(),
          updatedAt: new Date(p.updatedAt).toISOString(),
        })),
      }
    },
  })

  const getProject = tool({
    description: 'Get details of a specific Vercel project',
    inputSchema: z.object({
      projectIdOrName: z.string().describe('Project ID or name'),
    }),
    execute: async (params) => {
      const result = await client.getProject(params.projectIdOrName)

      return {
        id: result.id,
        name: result.name,
        accountId: result.accountId,
        createdAt: new Date(result.createdAt).toISOString(),
      }
    },
  })

  const createProject = tool({
    description: 'Create a new Vercel project',
    inputSchema: z.object({
      name: z.string().describe('Project name'),
      framework: z
        .string()
        .optional()
        .describe('Framework (nextjs, react, etc)'),
      buildCommand: z.string().optional().describe('Build command'),
      outputDirectory: z.string().optional().describe('Output directory'),
      installCommand: z.string().optional().describe('Install command'),
    }),
    execute: async (params) => {
      const result = await client.createProject({
        name: params.name,
        framework: params.framework,
        buildCommand: params.buildCommand,
        outputDirectory: params.outputDirectory,
        installCommand: params.installCommand,
      })

      return {
        id: result.id,
        name: result.name,
        createdAt: new Date(result.createdAt).toISOString(),
      }
    },
  })

  const listDeployments = tool({
    description: 'List deployments for a Vercel project',
    inputSchema: z.object({
      projectIdOrName: z.string().describe('Project ID or name'),
      limit: z
        .number()
        .optional()
        .describe('Maximum number of deployments to return'),
    }),
    execute: async (params) => {
      const result = await client.listDeployments(params.projectIdOrName, {
        limit: params.limit,
      })

      return {
        deployments: result.deployments.map((d) => ({
          uid: d.uid,
          name: d.name,
          url: d.url,
          state: d.state,
          created: new Date(d.created).toISOString(),
        })),
      }
    },
  })

  const getDeployment = tool({
    description: 'Get details of a specific deployment',
    inputSchema: z.object({
      deploymentId: z.string().describe('Deployment ID'),
    }),
    execute: async (params) => {
      const result = await client.getDeployment(params.deploymentId)

      return {
        uid: result.uid,
        name: result.name,
        url: result.url,
        state: result.state,
        created: new Date(result.created).toISOString(),
        error: result.error || undefined,
      }
    },
  })

  const createDeployment = tool({
    description: 'Create a new deployment on Vercel',
    inputSchema: z.object({
      projectIdOrName: z.string().describe('Project ID or name'),
      env: z.record(z.string()).optional().describe('Environment variables'),
      public: z.boolean().optional().describe('Make deployment public'),
    }),
    execute: async (params) => {
      const result = await client.createDeployment(params.projectIdOrName, {
        env: params.env,
        public: params.public,
      })

      return {
        uid: result.uid,
        name: result.name,
        url: result.url,
        state: result.state,
        created: new Date(result.created).toISOString(),
      }
    },
  })

  const getDeploymentLogs = tool({
    description: 'Get logs for a deployment',
    inputSchema: z.object({
      deploymentId: z.string().describe('Deployment ID'),
    }),
    execute: async (params) => {
      const result = await client.getDeploymentLogs(params.deploymentId)

      return {
        logs: result.logs.slice(-100), // Return last 100 lines
        totalLines: result.logs.length,
      }
    },
  })

  const getProjectEnv = tool({
    description: 'Get environment variables for a project',
    inputSchema: z.object({
      projectIdOrName: z.string().describe('Project ID or name'),
    }),
    execute: async (params) => {
      const result = await client.getEnv(params.projectIdOrName)

      return {
        count: result.envs.length,
        variables: result.envs.map((e) => ({
          key: e.key,
          type: e.type,
          target: e.target,
        })),
      }
    },
  })

  const setProjectEnv = tool({
    description: 'Set environment variables for a project',
    inputSchema: z.object({
      projectIdOrName: z.string().describe('Project ID or name'),
      variables: z.record(z.string()).describe('Environment variables to set'),
    }),
    execute: async (params) => {
      const result = await client.upsertEnv(
        params.projectIdOrName,
        params.variables,
      )

      return {
        created: result.created.length,
        updated: result.updated.length,
      }
    },
  })

  const listDomains = tool({
    description: 'List domains for a project',
    inputSchema: z.object({
      projectIdOrName: z.string().optional().describe('Project ID or name'),
    }),
    execute: async (params) => {
      const result = await client.listDomains(params.projectIdOrName)

      return {
        domains: result.domains.map((d) => ({
          name: d.name,
          verified: d.verified,
          apexName: d.apexName,
        })),
      }
    },
  })

  const createDomain = tool({
    description: 'Create a domain for a project',
    inputSchema: z.object({
      domain: z.string().describe('Domain name'),
      projectIdOrName: z.string().describe('Project ID or name'),
    }),
    execute: async (params) => {
      const result = await client.createDomain(
        params.domain,
        params.projectIdOrName,
      )

      return {
        name: result.name,
        verified: result.verified,
        apexName: result.apexName,
        verificationRecord: result.verificationRecord,
      }
    },
  })

  const getAnalytics = tool({
    description: 'Get analytics for a deployment',
    inputSchema: z.object({
      deploymentId: z.string().describe('Deployment ID'),
    }),
    execute: async (params) => {
      const result = await client.getAnalytics(params.deploymentId)

      return {
        analytics: result,
      }
    },
  })

  return {
    listProjects,
    getProject,
    createProject,
    listDeployments,
    getDeployment,
    createDeployment,
    getDeploymentLogs,
    getProjectEnv,
    setProjectEnv,
    listDomains,
    createDomain,
    getAnalytics,
  }
}

export type VercelTools = ReturnType<typeof createVercelTools>
