import type { V0ClientConfig } from 'v0-sdk'

export interface V0ToolsConfig extends V0ClientConfig {
  /**
   * Optional base URL for v0 API
   * @default "https://api.v0.dev"
   */
  baseUrl?: string
  /**
   * API key for v0 authentication
   * If not provided, will use V0_API_KEY environment variable
   */
  apiKey?: string
  /**
   * API token for Vercel API authentication
   * If not provided, will use VERCEL_API_TOKEN environment variable
   */
  apiToken?: string
  /**
   * Vercel team ID for team-scoped operations
   * If not provided, will use VERCEL_TEAM_ID environment variable
   */
  teamId?: string
}
