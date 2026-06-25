/**
 * Vercel Platform API Types
 */

export interface VercelProject {
  id: string
  name: string
  accountId: string
  createdAt: number
  updatedAt: number
  link?: {
    type: string
    repo?: string
  }
  productionDeploymentsFetched?: boolean
}

export interface VercelDeployment {
  uid: string
  name: string
  url: string
  created: number
  updated: number
  createdAt: number
  updatedAt: number
  state: 'BUILDING' | 'ERROR' | 'INITIALIZING' | 'QUEUED' | 'READY' | 'CANCELED'
  type: 'LAMBDAS' | 'STATIC'
  env?: Record<string, string>
  regions?: string[]
  error?: {
    code: string
    message: string
  }
}

export interface VercelDomain {
  name: string
  apexName: string
  projectId: string
  verified: boolean
  verificationRecord?: {
    type: string
    name: string
    value: string
  }
  createdAt?: number
  updatedAt?: number
}

export interface VercelEnvVariable {
  key: string
  value?: string
  type: 'system' | 'secret' | 'plain' | 'sensitive'
  target?: string[]
  id?: string
  createdAt?: number
  updatedAt?: number
}

export interface VercelSecret {
  name: string
  value: string
  teamId?: string
  userId?: string
  created: number
}

export interface VercelAnalytics {
  pagesFetched?: number
  pageSize?: number
  pages?: VercelAnalyticsPage[]
  [key: string]: unknown
}

export interface VercelAnalyticsPage {
  path: string
  count: number
  avg: number
  p50: number
  p90: number
  p99: number
}

export interface VercelDeploymentEvent {
  id: string
  type: string
  created: number
  payload: Record<string, unknown>
}

export interface CreateProjectOptions {
  name: string
  accountId?: string
  gitRepository?: {
    type: 'github' | 'gitlab' | 'bitbucket'
    repo: string
  }
  framework?: string
  buildCommand?: string
  outputDirectory?: string
  installCommand?: string
  environmentVariables?: Record<string, string>
}

export interface CreateDeploymentOptions {
  projectId?: string
  name?: string
  files?: Record<string, string>
  env?: Record<string, string>
  regions?: string[]
  public?: boolean
}

export interface AnalyticsOptions {
  since?: number
  until?: number
  metric?: 'pagesFetched' | 'pageSize' | 'readBytes' | 'writeBytes'
}

export interface VercelClientOptions {
  apiToken: string
  teamId?: string
  baseURL?: string
}
