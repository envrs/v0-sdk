import { tool } from 'ai'
import { z } from 'zod'
import { createVercelClient } from '@v0-sdk/vercel'
import type { V0ToolsConfig } from '../types'

/**
 * Creates Vercel Platform AI SDK tools for enhanced deployment capabilities
 * Extends v0 deployment tools with Vercel-specific operations
 */
export function createVercelPlatformTools(config: V0ToolsConfig = {}) {
  const apiToken = config.apiToken || config.apiKey || process.env.VERCEL_API_TOKEN || ''
  const teamId = config.teamId || process.env.VERCEL_TEAM_ID
  const vercel = createVercelClient(apiToken, teamId)

  const deployToVercel = tool({
    description: 'Deploy a v0-generated application to Vercel platform',
    inputSchema: z.object({
      projectName: z.string().describe('Name for the Vercel project'),
      framework: z
        .string()
        .optional()
        .describe('Framework (nextjs, react, etc)'),
      buildCommand: z.string().optional().describe('Custom build command'),
      outputDirectory: z
        .string()
        .optional()
        .describe('Output directory for build'),
      environmentVariables: z
        .record(z.string())
        .optional()
        .describe('Environment variables'),
    }),
    execute: async (params) => {
      try {
        // Create project if it doesn't exist
        const project = await vercel.createProject({
          name: params.projectName,
          framework: params.framework,
          buildCommand: params.buildCommand,
          outputDirectory: params.outputDirectory,
          environmentVariables: params.environmentVariables,
        })

        // Set environment variables if provided
        if (params.environmentVariables) {
          await vercel.upsertEnv(project.id, params.environmentVariables)
        }

        return {
          success: true,
          projectId: project.id,
          projectName: project.name,
          createdAt: new Date(project.createdAt).toISOString(),
          message: `Project "${project.name}" created successfully on Vercel`,
        }
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        }
      }
    },
  })

  const getDeploymentStatus = tool({
    description: 'Get the current status of a Vercel deployment',
    inputSchema: z.object({
      deploymentId: z.string().describe('Vercel deployment ID'),
    }),
    execute: async (params) => {
      try {
        const deployment = await vercel.getDeployment(params.deploymentId)

        return {
          deploymentId: deployment.uid,
          name: deployment.name,
          url: deployment.url,
          state: deployment.state,
          created: new Date(deployment.created).toISOString(),
          updated: new Date(deployment.updated).toISOString(),
          error: deployment.error || undefined,
        }
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : 'Unknown error',
        }
      }
    },
  })

  const configureProjectEnvironment = tool({
    description: 'Configure environment variables for a Vercel project',
    inputSchema: z.object({
      projectIdOrName: z.string().describe('Project ID or name'),
      variables: z.record(z.string()).describe('Environment variables to set'),
      targets: z
        .array(z.enum(['production', 'preview', 'development']))
        .optional()
        .describe('Deployment targets'),
    }),
    execute: async (params) => {
      try {
        const result = await vercel.upsertEnv(
          params.projectIdOrName,
          params.variables,
        )

        return {
          success: true,
          created: result.created.length,
          updated: result.updated.length,
          message: `Set ${result.created.length + result.updated.length} environment variables`,
        }
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        }
      }
    },
  })

  const createProductionDeployment = tool({
    description: 'Create a production deployment from current code',
    inputSchema: z.object({
      projectIdOrName: z.string().describe('Project ID or name'),
      env: z
        .record(z.string())
        .optional()
        .describe('Production environment variables'),
    }),
    execute: async (params) => {
      try {
        const deployment = await vercel.createDeployment(
          params.projectIdOrName,
          {
            env: params.env,
            public: true,
          },
        )

        return {
          success: true,
          deploymentId: deployment.uid,
          url: deployment.url,
          state: deployment.state,
          message: `Deployment created: ${deployment.url}`,
        }
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        }
      }
    },
  })

  const getDeploymentLogs = tool({
    description: 'Retrieve deployment build and runtime logs',
    inputSchema: z.object({
      deploymentId: z.string().describe('Deployment ID'),
    }),
    execute: async (params) => {
      try {
        const result = await vercel.getDeploymentLogs(params.deploymentId)

        return {
          logs: result.logs,
          lineCount: result.logs.length,
        }
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : 'Unknown error',
        }
      }
    },
  })

  const setupCustomDomain = tool({
    description: 'Configure a custom domain for a Vercel project',
    inputSchema: z.object({
      domain: z.string().describe('Domain name (e.g., example.com)'),
      projectIdOrName: z.string().describe('Project ID or name'),
    }),
    execute: async (params) => {
      try {
        const result = await vercel.createDomain(
          params.domain,
          params.projectIdOrName,
        )

        return {
          domain: result.name,
          verified: result.verified,
          verificationRecord: result.verificationRecord,
          message: result.verified
            ? `Domain ${result.name} is verified and active`
            : `Domain ${result.name} created. Please add the DNS records to verify ownership`,
        }
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : 'Unknown error',
        }
      }
    },
  })

  const getProjectAnalytics = tool({
    description: 'Get performance analytics for a deployment',
    inputSchema: z.object({
      deploymentId: z.string().describe('Deployment ID'),
      metric: z
        .enum(['pagesFetched', 'pageSize', 'readBytes', 'writeBytes'])
        .optional()
        .describe('Specific metric to retrieve'),
    }),
    execute: async (params) => {
      try {
        const analytics = await vercel.getAnalytics(params.deploymentId, {
          metric: params.metric as any,
        })

        return {
          deploymentId: params.deploymentId,
          analytics: analytics,
        }
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : 'Unknown error',
        }
      }
    },
  })

  const listProjectDeployments = tool({
    description: 'List all deployments for a project with their current states',
    inputSchema: z.object({
      projectIdOrName: z.string().describe('Project ID or name'),
      limit: z.number().optional().describe('Number of deployments to list'),
    }),
    execute: async (params) => {
      try {
        const result = await vercel.listDeployments(params.projectIdOrName, {
          limit: params.limit,
          sort: 'desc',
        })

        return {
          deployments: result.deployments.map((d) => ({
            id: d.uid,
            name: d.name,
            url: d.url,
            state: d.state,
            created: new Date(d.created).toISOString(),
          })),
        }
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : 'Unknown error',
        }
      }
    },
  })

  return {
    deployToVercel,
    getDeploymentStatus,
    configureProjectEnvironment,
    createProductionDeployment,
    getDeploymentLogs,
    setupCustomDomain,
    getProjectAnalytics,
    listProjectDeployments,
  }
}

export type VercelPlatformTools = ReturnType<typeof createVercelPlatformTools>
