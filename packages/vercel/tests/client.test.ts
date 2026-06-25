import { describe, it, expect } from 'vitest'
import { VercelClient, createVercelClient } from '../src/client'

describe('VercelClient', () => {
  it('should create with apiToken', () => {
    const client = new VercelClient({ apiToken: 'test-token' })
    expect(client).toBeInstanceOf(VercelClient)
  })

  it('should create with apiKey as alias', () => {
    const client = new VercelClient({ apiKey: 'test-key' })
    expect(client).toBeInstanceOf(VercelClient)
  })

  it('should accept teamId', () => {
    const client = new VercelClient({ apiToken: 'test-token', teamId: 'team_123' })
    expect(client).toBeInstanceOf(VercelClient)
  })

  it('should accept custom baseURL', () => {
    const client = new VercelClient({
      apiToken: 'test-token',
      baseURL: 'https://custom.vercel.com',
    })
    expect(client).toBeInstanceOf(VercelClient)
  })

  it('should create without apiToken (for lazy initialization)', () => {
    const client = new VercelClient({})
    expect(client).toBeInstanceOf(VercelClient)
  })
})

describe('createVercelClient', () => {
  it('should create client with apiToken', () => {
    const client = createVercelClient('test-token')
    expect(client).toBeInstanceOf(VercelClient)
  })

  it('should create client with apiToken and teamId', () => {
    const client = createVercelClient('test-token', 'team_123')
    expect(client).toBeInstanceOf(VercelClient)
  })
})
