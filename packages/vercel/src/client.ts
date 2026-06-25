import {
  VercelClientOptions,
  VercelProject,
  VercelDeployment,
  VercelEnvVariable,
  VercelDomain,
  CreateProjectOptions,
  CreateDeploymentOptions,
  AnalyticsOptions,
  VercelAnalytics,
} from './types'

export type { VercelClientOptions }

/**
 * Vercel API Client
 * Complete TypeScript client for Vercel Platform API
 */
export class VercelClient {
  private apiToken: string
  private teamId?: string
  private baseURL: string

  constructor(options: VercelClientOptions) {
    if (!options.apiToken) {
      throw new Error('Vercel API token is required')
    }
    this.apiToken = options.apiToken
    this.teamId = options.teamId
    this.baseURL = options.baseURL || 'https://api.vercel.com'
  }

  /**
   * Make HTTP request to Vercel API
   */
  private async request<T>(
    method: string,
    path: string,
    options?: {
      body?: unknown
      query?: Record<string, string | number>
    },
  ): Promise<T> {
    const url = new URL(`${this.baseURL}${path}`)

    if (options?.query) {
      Object.entries(options.query).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }

    if (this.teamId) {
      url.searchParams.append('teamId', this.teamId)
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json',
    }

    const response = await fetch(url.toString(), {
      method,
      headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(
        `Vercel API error: ${response.status} - ${JSON.stringify(error)}`,
      )
    }

    return response.json()
  }

  // ===== Projects =====

  /**
   * Get a project by ID or name
   */
  async getProject(projectIdOrName: string): Promise<VercelProject> {
    return this.request('GET', `/v9/projects/${projectIdOrName}`)
  }

  /**
   * List all projects
   */
  async listProjects(options?: { limit?: number; from?: string }): Promise<{
    projects: VercelProject[]
    pagination?: { next?: string }
  }> {
    return this.request('GET', '/v9/projects', {
      query: {
        limit: options?.limit || 50,
        ...(options?.from && { from: options.from }),
      },
    })
  }

  /**
   * Create a new project
   */
  async createProject(options: CreateProjectOptions): Promise<VercelProject> {
    return this.request('POST', '/v10/projects', {
      body: options,
    })
  }

  /**
   * Delete a project
   */
  async deleteProject(projectIdOrName: string): Promise<{ deleted: boolean }> {
    return this.request('DELETE', `/v9/projects/${projectIdOrName}`)
  }

  // ===== Deployments =====

  /**
   * Get a deployment by ID
   */
  async getDeployment(deploymentId: string): Promise<VercelDeployment> {
    return this.request('GET', `/v12/deployments/${deploymentId}`)
  }

  /**
   * List deployments for a project
   */
  async listDeployments(
    projectIdOrName: string,
    options?: { limit?: number; from?: string; sort?: 'asc' | 'desc' },
  ): Promise<{
    deployments: VercelDeployment[]
    pagination?: { next?: string }
  }> {
    return this.request('GET', '/v6/deployments', {
      query: {
        projectId: projectIdOrName,
        limit: options?.limit || 10,
        sort: options?.sort || 'desc',
        ...(options?.from && { until: options.from }),
      },
    })
  }

  /**
   * Create a new deployment
   */
  async createDeployment(
    projectIdOrName: string,
    options: CreateDeploymentOptions,
  ): Promise<VercelDeployment> {
    return this.request('POST', '/v13/deployments', {
      body: {
        ...options,
        projectId: projectIdOrName,
      },
    })
  }

  /**
   * Delete a deployment
   */
  async deleteDeployment(deploymentId: string): Promise<{ deleted: boolean }> {
    return this.request('DELETE', `/v13/deployments/${deploymentId}`)
  }

  /**
   * Get deployment logs
   */
  async getDeploymentLogs(
    deploymentId: string,
    options?: { follow?: boolean; lines?: number },
  ): Promise<{ logs: string[] }> {
    const logs: string[] = []
    const response = await fetch(
      `${this.baseURL}/v2/deployments/${deploymentId}/logs?${new URLSearchParams(
        {
          ...(options?.lines && { lines: String(options.lines) }),
        },
      ).toString()}`,
      {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      },
    )

    const reader = response.body?.getReader()
    if (!reader) return { logs }

    const decoder = new TextDecoder()
    let buffer = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line) {
            try {
              const data = JSON.parse(line)
              if (data.text) logs.push(data.text)
            } catch {
              logs.push(line)
            }
          }
        }
      }
    } finally {
      reader.releaseLock()
    }

    return { logs }
  }

  /**
   * Get deployment events
   */
  async getDeploymentEvents(deploymentId: string): Promise<{
    events: Array<{
      id: string
      type: string
      created: number
      payload: Record<string, unknown>
    }>
  }> {
    return this.request('GET', `/v3/deployments/${deploymentId}/events`)
  }

  // ===== Environment Variables =====

  /**
   * Get environment variables for a project
   */
  async getEnv(projectIdOrName: string): Promise<{
    envs: VercelEnvVariable[]
  }> {
    return this.request('GET', `/v9/projects/${projectIdOrName}/env`, {
      query: { decrypt: '1' },
    })
  }

  /**
   * Upsert environment variables
   */
  async upsertEnv(
    projectIdOrName: string,
    variables: Record<string, string>,
  ): Promise<{
    created: VercelEnvVariable[]
    updated: VercelEnvVariable[]
  }> {
    const envs = Object.entries(variables).map(([key, value]) => ({
      key,
      value,
      type: 'plain' as const,
      target: ['production', 'preview', 'development'],
    }))

    return this.request('POST', `/v9/projects/${projectIdOrName}/env`, {
      body: { envs },
    })
  }

  /**
   * Delete an environment variable
   */
  async deleteEnv(
    projectIdOrName: string,
    envId: string,
  ): Promise<{ deleted: boolean }> {
    return this.request(
      'DELETE',
      `/v9/projects/${projectIdOrName}/env/${envId}`,
    )
  }

  // ===== Domains =====

  /**
   * List domains for a project
   */
  async listDomains(projectIdOrName?: string): Promise<{
    domains: VercelDomain[]
  }> {
    const path = projectIdOrName
      ? `/v4/projects/${projectIdOrName}/domains`
      : '/v4/domains'
    return this.request('GET', path)
  }

  /**
   * Create a domain for a project
   */
  async createDomain(
    domain: string,
    projectIdOrName: string,
  ): Promise<VercelDomain> {
    return this.request('POST', `/v10/projects/${projectIdOrName}/domains`, {
      body: { domain },
    })
  }

  /**
   * Remove a domain
   */
  async removeDomain(domain: string): Promise<{ deleted: boolean }> {
    return this.request('DELETE', `/v4/domains/${domain}`)
  }

  /**
   * Get domain configuration
   */
  async getDomainConfig(domain: string): Promise<{
    nameservers: string[]
    expectedNameservers: string[]
    misconfigured: boolean
  }> {
    return this.request('GET', `/v6/domains/${domain}/config`)
  }

  // ===== Analytics =====

  /**
   * Get deployment analytics
   */
  async getAnalytics(
    deploymentId: string,
    options?: AnalyticsOptions,
  ): Promise<VercelAnalytics> {
    return this.request('GET', `/v3/deployments/${deploymentId}/analytics`, {
      query: {
        ...(options?.since && { since: options.since }),
        ...(options?.until && { until: options.until }),
        ...(options?.metric && { metric: options.metric }),
      },
    })
  }

  // ===== Aliases =====

  /**
   * List aliases for a project
   */
  async listAliases(projectIdOrName: string): Promise<{
    aliases: Array<{
      uid: string
      alias: string
      created: number
      deploymentId: string
    }>
  }> {
    return this.request('GET', `/v4/projects/${projectIdOrName}/alias`)
  }

  /**
   * Create an alias for a deployment
   */
  async createAlias(
    deploymentId: string,
    alias: string,
  ): Promise<{
    uid: string
    alias: string
    created: number
    deploymentId: string
  }> {
    return this.request('POST', `/v2/deployments/${deploymentId}/alias`, {
      body: { alias },
    })
  }

  /**
   * Delete an alias
   */
  async deleteAlias(alias: string): Promise<{ deleted: boolean }> {
    return this.request('DELETE', `/v2/alias/${alias}`)
  }
}

/**
 * Factory function to create a Vercel client
 */
export function createVercelClient(
  apiToken: string,
  teamId?: string,
): VercelClient {
  return new VercelClient({
    apiToken,
    teamId,
  })
}
